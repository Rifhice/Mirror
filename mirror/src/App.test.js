import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const isConfigValid = (config) => {
  try {
    const max_width = config['max-width']
    const max_height = config['max-height']
    let grid = []
    for (let index_y = 0; index_y < max_height; index_y++) {
      let array = []
      for (let index_x = 0; index_x < max_width; index_x++) {
        array.push(false)
      }
      grid.push(array)
    }
    const fill_grid = (x, y, width, height) => {
      for (let index_y = 0; index_y < height; index_y++) {
        for (let index_x = 0; index_x < width; index_x++) {
          if (!grid[index_x + x][index_y + y])
            grid[index_x + x][index_y + y] = true
          else
            throw new Error("Overlapping")
        }
      }
    }
    for (const current of Object.keys(config.modules)) {
      let module = config.modules[current]
      fill_grid(module.x, module.y, module.width, module.height)
    }
    grid.forEach(row => row.forEach(cell => { if (!cell) throw new Error("Empty cell") }))
    return true
  }
  catch (error) {
    return false
  }
}

describe('is visual configuration accurate', () => {
  it('1 4 4 1 config', () => {
    const config = {
      "max-width": 4,
      "max-height": 4,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 4,
          "height": 1,
          "config": {}
        },
        "default/time/2": {
          "x": 0,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/3": {
          "x": 1,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/4": {
          "x": 2,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/5": {
          "x": 3,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/6": {
          "x": 0,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/7": {
          "x": 1,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/8": {
          "x": 2,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/9": {
          "x": 3,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/10": {
          "x": 0,
          "y": 3,
          "width": 4,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(true)
  })
  it('15 module on a 16 module configuration (not valid)', () => {
    const config = {
      "max-width": 4,
      "max-height": 4,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/2": {
          "x": 1,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/3": {
          "x": 2,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/4": {
          "x": 3,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/5": {
          "x": 0,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/6": {
          "x": 1,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/7": {
          "x": 2,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/8": {
          "x": 3,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/9": {
          "x": 0,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/10": {
          "x": 1,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/11": {
          "x": 2,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/12": {
          "x": 3,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/13": {
          "x": 0,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/14": {
          "x": 1,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/15": {
          "x": 2,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(false)
  })
  it('16 module', () => {
    const config = {
      "max-width": 4,
      "max-height": 4,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/2": {
          "x": 1,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/3": {
          "x": 2,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/4": {
          "x": 3,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/5": {
          "x": 0,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/6": {
          "x": 1,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/7": {
          "x": 2,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/8": {
          "x": 3,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/9": {
          "x": 0,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/10": {
          "x": 1,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/11": {
          "x": 2,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/12": {
          "x": 3,
          "y": 2,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/13": {
          "x": 0,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/14": {
          "x": 1,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/15": {
          "x": 2,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/16": {
          "x": 3,
          "y": 3,
          "width": 1,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(true)
  })
  it('fullscreen config', () => {
    const config = {
      "max-width": 1,
      "max-height": 1,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(true)
  })
  it('valid configuration', () => {
    const config = {
      "max-width": 3,
      "max-height": 3,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 3,
          "height": 1,
          "config": {}
        },
        "default/time/2": {
          "x": 0,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/empty": {
          "x": 1,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/3": {
          "x": 2,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/4": {
          "x": 0,
          "y": 2,
          "width": 3,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(true)
  })
  it('miss one module', () => {
    const config = {
      "max-width": 3,
      "max-height": 3,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 3,
          "height": 1,
          "config": {}
        },
        "default/time/2": {
          "x": 0,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/empty": {
          "x": 1,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/3": {
          "x": 2,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(false)
  })
  it('one module with 2 height', () => {
    const config = {
      "max-width": 3,
      "max-height": 3,
      "modules": {
        "default/time/1": {
          "x": 0,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/2": {
          "x": 1,
          "y": 0,
          "width": 1,
          "height": 2,
          "config": {}
        },
        "default/empty": {
          "x": 2,
          "y": 0,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/3": {
          "x": 0,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/4": {
          "x": 2,
          "y": 1,
          "width": 1,
          "height": 1,
          "config": {}
        },
        "default/time/5": {
          "x": 0,
          "y": 2,
          "width": 3,
          "height": 1,
          "config": {}
        }
      }
    }
    expect(isConfigValid(config)).toEqual(true)
  })
});
