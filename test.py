import time
from threading import Thread
import random
import sys

isTakingPicture = False


class Snapshotter(Thread):
    def __init__(self):
        Thread.__init__(self)

    def run(self):
        global isTakingPicture
        for line in sys.stdin:
            if line == "yo\n":
                isTakingPicture = True


thread_1 = Snapshotter()
thread_1.start()

while True:
    if isTakingPicture:
        print("whallah")
