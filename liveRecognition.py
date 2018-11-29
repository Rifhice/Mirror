import face_recognition
import cv2
import socket
import sys
import os
from os import listdir
from os.path import isfile, join
import numpy
from threading import Thread

isStarted = False
isBuilt = False
isTakingPicture = False
name = ["pierre", "jacques"]
sys.stdout.write("status/stopped\n")


class StateHandler(Thread):
    def __init__(self):
        Thread.__init__(self)

    def run(self):
        global isTakingPicture
        global isBuilt
        global isStarted
        global name
        for line in sys.stdin:
            words = line.split("/")
            if words[0] == "picture":
                isTakingPicture = True
                isStarted = False
                sys.stdout.write("status/picture\n")
                name = words[1:]
            elif words[0] == "start\n":
                isStarted = True
                isBuilt = False
            elif words[0] == "stop\n":
                isStarted = False
                sys.stdout.write("status/stopped\n")
            elif words[0] == "exit\n":
                break
        print("exiting")
        os._exit(1)


def build():
    sys.stdout.write("status/building\n")
    known_face_encodings = []
    known_face_names = []
    models = [f for f in listdir("./Model") if isfile(join('./Model', f))]
    for model in models:
        try:
            image = face_recognition.load_image_file("./Model/" + model)
            face_encoding = face_recognition.face_encodings(image)[0]
            known_face_encodings.append(face_encoding)
            known_face_names.append(model)
        except Exception:
            print("error/error loading model " + model)
    return [known_face_encodings,
            known_face_names]


def guess(rgb_small_frame, display):
    sys.stdout.write("status/guessing\n")
    face_names = []
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(
        rgb_small_frame, face_locations)

    for face_encoding in face_encodings:
        matches = face_recognition.face_distance(
            known_face_encodings, face_encoding)
        name = "Unknown"
        closest = min(float(s) for s in matches)
        if closest < 0.5:
            i = 0
            for match in matches:
                if match == closest:
                    name = known_face_names[i].split('.')[0]
                    sys.stdout.write(name + "\n")
                    # client.sendto(name.encode(), ("localhost", 1111))
                i = i + 1
        face_names.append(name)
    if display:
        # Display the results
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw a box around the face
            cv2.rectangle(frame, (left, top),
                          (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35),
                          (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6),
                        font, 1.0, (255, 255, 255), 1)

        # Display the resulting image
        cv2.imshow('Video', frame)
    return face_names


stateHandler = StateHandler()
stateHandler.start()

video_capture = cv2.VideoCapture(0)
ret, frame = video_capture.read()

known_face_encodings = []
known_face_names = []
cpt = 0
while True:
    if isStarted:
        if not(isBuilt):
            known_face_encodings, known_face_names = build()
            isBuilt = True
        elif isBuilt:
            # Grabbing camera image
            ret, frame = video_capture.read()
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
            rgb_small_frame = small_frame[:, :, ::-1]
            # Guess one every 3 frame
            if cpt % 3 == 0:
                guess(rgb_small_frame,
                      len(sys.argv) > 1 and sys.argv[1] == '1')
            cpt = cpt + 1
            if cpt > 300:
                cpt = 0
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    elif not(isStarted) and isTakingPicture:
        ret, frame = video_capture.read()
        cv2.imwrite("./Model/" + " ".join(name).rstrip("\n") + ".png", frame)
        isTakingPicture = False
        isStarted = True
        isBuilt = False


# Release handle to the webcam
sys.stdout.write("Close")
video_capture.release()
cv2.destroyAllWindows()
