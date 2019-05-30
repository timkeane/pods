import $ from 'jquery'
import facilityStyle from '../src/js/facility-style'
import decorations from '../src/js/decorations'
import pods from '../src/js/pods'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App';
import GeoJson from 'ol/format/GeoJSON'
import Layer from 'ol/layer/Vector'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('ol/format/GeoJSON')
jest.mock('ol/layer/Vector')
jest.mock('ol/geom/Point')

const mockContent = {
  messages: {
    title: 'app title',
    splash: 'splash content',
    marquee: 'marquee msg'
  },
  message: (key) => {
    return mockContent.messages[key]
  }
}

const addMarquee = App.prototype.addMarquee
const addDescription = App.prototype.addDescription
const addLegend = App.prototype.addLegend
const rearrangeLayers = App.prototype.rearrangeLayers
const addLabels = App.prototype.addLabels
const highlightSite = App.prototype.highlightSite

beforeEach(() => {
  FinderApp.mockClear()
  GeoJson.mockClear()
  Layer.mockClear()
  App.prototype.addMarquee = jest.fn()
  App.prototype.addDescription = jest.fn()
  App.prototype.addLegend = jest.fn()
  App.prototype.rearrangeLayers = jest.fn()
  App.prototype.addLabels = jest.fn()
  App.prototype.highlightSite = jest.fn()
})

afterEach(() => {
  App.prototype.addMarquee = addMarquee
  App.prototype.addDescription = addDescription
  App.prototype.addLegend = addLegend
  App.prototype.rearrangeLayers = rearrangeLayers
  App.prototype.addLabels = addLabels
  App.prototype.highlightSite = highlightSite
})

describe('constructor', () => {

  test('constructor active', () => {
    expect.assertions(62)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('app title')
    expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('splash content')
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('http://pods-endpoint')
    
    expect(GeoJson).toHaveBeenCalledTimes(1)
    expect(GeoJson.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    expect(GeoJson.mock.calls[0][0].featureProjection).toBe('EPSG:3857')
    expect(FinderApp.mock.calls[0][0].facilityFormat).toBe(GeoJson.mock.instances[0])
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('PODs')
    expect(FinderApp.mock.calls[0][0].facilityStyle).toBe(facilityStyle.pointStyle)
    expect(FinderApp.mock.calls[0][0].facilitySearch.displayField).toBe('search_label')
    expect(FinderApp.mock.calls[0][0].facilitySearch.nameField).toBe('name')
    
    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(pods.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(pods.DIRECTIONS_URL)

    expect(FinderApp.mock.calls[0][0].highlightStyle).toBe(facilityStyle.highlightStyle)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].title).toBe('Borough')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices.length).toBe(5)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].values).toEqual(['Brooklyn'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].label).toBe('Brooklyn')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].values).toEqual(['Bronx'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].label).toBe('Bronx')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].values).toEqual(['Queens'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].label).toBe('Queens')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].values).toEqual(['Staten Island'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].label).toBe('Staten Island')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].values).toEqual(['Manhattan'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].label).toBe('Manhattan')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].title).toBe('Status')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices.length).toBe(3)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[0].name).toBe('status')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[0].values).toEqual(['Open to Public'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[0].label).toBe('Open to Public')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[0].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[1].name).toBe('status')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[1].values).toEqual(['Mobilizing'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[1].label).toBe('Opening Soon')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[1].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[2].name).toBe('status')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[2].values).toEqual(['Closed to Public', 'Demobilizing', 'Demobilized'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[2].label).toBe('Closed to Public')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[1].choices[2].checked).toBe(true)
    
    expect(App.prototype.addMarquee).toHaveBeenCalledTimes(1)
    expect(App.prototype.addDescription).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLegend).toHaveBeenCalledTimes(1)
    expect(App.prototype.rearrangeLayers).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLabels).toHaveBeenCalledTimes(1)
    expect(App.prototype.highlightSite).toHaveBeenCalledTimes(1)

  })

  test('constructor not active', () => {
    expect.assertions(48)

    mockContent.messages.active = 'false'

    const app = new App(mockContent, 'http://pods-endpoint')

    expect(app instanceof FinderApp).toBe(true)
    expect(FinderApp).toHaveBeenCalledTimes(1)

    expect(FinderApp.mock.calls[0][0].title).toBe('app title')
    expect(FinderApp.mock.calls[0][0].splashOptions.message).toBe('splash content')
    expect(FinderApp.mock.calls[0][0].facilityUrl).toBe('http://pods-endpoint')
    
    expect(GeoJson).toHaveBeenCalledTimes(1)
    expect(GeoJson.mock.calls[0][0].dataProjection).toBe('EPSG:2263')
    expect(GeoJson.mock.calls[0][0].featureProjection).toBe('EPSG:3857')
    expect(FinderApp.mock.calls[0][0].facilityFormat).toBe(GeoJson.mock.instances[0])
    
    expect(FinderApp.mock.calls[0][0].facilityTabTitle).toBe('PODs')
    expect(FinderApp.mock.calls[0][0].facilityStyle).toBe(facilityStyle.pointStyle)
    expect(FinderApp.mock.calls[0][0].facilitySearch.displayField).toBe('search_label')
    expect(FinderApp.mock.calls[0][0].facilitySearch.nameField).toBe('name')
    
    expect(FinderApp.mock.calls[0][0].decorations.length).toBe(2)
    expect(FinderApp.mock.calls[0][0].decorations[0].content).toBe(mockContent)
    expect(FinderApp.mock.calls[0][0].decorations[1]).toBe(decorations)

    expect(FinderApp.mock.calls[0][0].geoclientUrl).toBe(pods.GEOCLIENT_URL)
    expect(FinderApp.mock.calls[0][0].directionsUrl).toBe(pods.DIRECTIONS_URL)

    expect(FinderApp.mock.calls[0][0].highlightStyle).toBe(facilityStyle.highlightStyle)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions.length).toBe(1)
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].title).toBe('Borough')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices.length).toBe(5)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].values).toEqual(['Brooklyn'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].label).toBe('Brooklyn')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[0].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].values).toEqual(['Bronx'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].label).toBe('Bronx')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[1].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].values).toEqual(['Queens'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].label).toBe('Queens')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[2].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].values).toEqual(['Staten Island'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].label).toBe('Staten Island')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[3].checked).toBe(true)

    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].name).toBe('boro')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].values).toEqual(['Manhattan'])
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].label).toBe('Manhattan')
    expect(FinderApp.mock.calls[0][0].filterChoiceOptions[0].choices[4].checked).toBe(true)

    expect(App.prototype.addMarquee).toHaveBeenCalledTimes(1)
    expect(App.prototype.addDescription).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLegend).toHaveBeenCalledTimes(1)
    expect(App.prototype.rearrangeLayers).toHaveBeenCalledTimes(1)
    expect(App.prototype.addLabels).toHaveBeenCalledTimes(1)
    expect(App.prototype.highlightSite).toHaveBeenCalledTimes(1)

  })
})

describe('addMarquee', () => {
  let marquee
  
  beforeEach(() => {
    marquee = $('<div id="marquee"><div><div><div></div></div></div></div>')
    $('body').append(marquee).removeClass('alert')
  })

  afterEach(() => {
    marquee.remove()
  })

  test('addMarquee active', () => {
    expect.assertions(2)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')

    app.addMarquee = addMarquee

    app.addMarquee()

    expect($('#marquee div>div>div').html()).toBe('marquee msg')
    expect($('body').hasClass('alert')).toBe(true)
  })

  test('addMarquee not active', () => {
    expect.assertions(2)

    mockContent.messages.active = 'false'

    const app = new App(mockContent, 'http://pods-endpoint')

    app.addMarquee = addMarquee

    app.addMarquee()

    expect($('#marquee div>div>div').html()).toBe('')
    expect($('body').hasClass('alert')).toBe(false)
  })
})

describe('addDescription', () => {
  let facilityList
  
  beforeEach(() => {
    facilityList = $('<div id="facilities"><div class="list"></div></div>')
    $('body').append(facilityList)
  })

  afterEach(() => {
    facilityList.remove()
  })

  test('addDescription', () => {
    expect.assertions(1)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')

    app.addDescription = addDescription

    app.addDescription()
    expect($('.description').parent().html()).toBe(`${pods.DESCRIPTION_HTML}<div class="list"></div>`)
  })
})

describe('rearrangeLayers', () => {
  const setZ = jest.fn()
  const mockMap = {
    getBaseLayers: () => {
      return {
        labels: {
          base: {
            setZIndex: setZ
          }
        }
      }
    }
  }
  const mockLayer = {
    setZIndex: setZ
  }

  beforeEach(() => {
    setZ.mockClear()
  })

  test('rearrangeLayers', () => {
    expect.assertions(3)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')
    app.map = mockMap
    app.layer = mockLayer

    app.rearrangeLayers = rearrangeLayers

    app.rearrangeLayers()

    expect(setZ).toHaveBeenCalledTimes(2)
    expect(setZ.mock.calls[0][0]).toBe(0)
    expect(setZ.mock.calls[1][0]).toBe(1)
  })
})

describe('addLabels', () => {
  const mockMap = {
    addLayer: jest.fn()
  }

  test('addLabels', () => {
    expect.assertions(5)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')
    app.map = mockMap
    app.source = 'mock-source'

    app.addLabels = addLabels

    app.addLabels()

    expect(Layer).toHaveBeenCalledTimes(1)
    expect(Layer.mock.calls[0][0].source).toBe(app.source)
    expect(Layer.mock.calls[0][0].style).toBe(facilityStyle.textStyle)
    expect(Layer.mock.calls[0][0].declutter).toBe(true)
    expect(Layer.mock.calls[0][0].zIndex).toBe(2)
  })
})

describe('highlightSite', () => {
  const mockMap = {
    handlers: {},
    forEachFeatureAtPixel: jest.fn(),
    on: (event, handler) => {
      mockMap.handlers[event] = handler
    },
    trigger: (event) => {
      mockMap.handlers[event]({pixel: 'mock-pixel'})
    }
  }
  let listIt

  beforeEach(() => {
    listIt = $('<div class="lst-it active"></div>')
    $('body').append(listIt)
    mockMap.forEachFeatureAtPixel.mockClear()
  })

  afterEach(() => {
    listIt.remove()
  })

  test('highlightSite', () => {
    expect.assertions(6)

    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')
    app.map = mockMap

    app.highlightSite = highlightSite

    expect(listIt.hasClass('active')).toBe(true)

    app.highlightSite()

    expect(typeof mockMap.handlers.pointermove).toBe('function')

    mockMap.trigger('pointermove')

    expect(mockMap.forEachFeatureAtPixel).toHaveBeenCalledTimes(1)
    expect(mockMap.forEachFeatureAtPixel.mock.calls[0][0]).toBe('mock-pixel')
    expect(mockMap.forEachFeatureAtPixel.mock.calls[0][1]).toBe(app.highlightListItem)
    expect(listIt.hasClass('active')).toBe(false)
  })
})

describe('highlightListItem', () => {
  let feature1Div, feature2Div

  const feature1 = {
    getId: jest.fn().mockImplementation(() => {
      return 'feature1'
    })
  }
  const feature2 = {
    getId: jest.fn().mockImplementation(() => {
      return 'feature2'
    })
  }

  beforeEach(() => {
    feature1.getId.mockClear()
    feature2.getId.mockClear()
    feature1Div = $('<div class="lst-it"><div class="feature1"></div></div>')
    feature2Div = $('<div class="lst-it"><div class="feature2"></div></div>')
    $('body').append(feature1Div).append(feature2Div)
  })

  afterEach(() => {
    feature1Div.remove()
    feature2Div.remove()
  })

  test('highlightListItem', () => {
    expect.assertions(4)
    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')
  
    expect($('.feature1').parent().hasClass('active')).toBe(false)
    expect($('.feature2').parent().hasClass('active')).toBe(false)

    app.highlightListItem(feature1)
    expect($('.feature1').parent().hasClass('active')).toBe(true)
    app.highlightListItem(feature2)
    expect($('.feature2').parent().hasClass('active')).toBe(true)
  
  })
})


describe('addLegend', () => {
  let description, legend
  
  beforeEach(() => {
    description = $(pods.DESCRIPTION_HTML)
    legend = $(pods.LEGEND_HTML)
    legend.css('display', 'none')
    $('body').append(description).append(legend)
  })

  afterEach(() => {
    description.remove()
    legend.remove()
  })

  test('addLegend - active true', () => {
    expect.assertions(3)
    mockContent.messages.active = 'true'

    const app = new App(mockContent, 'http://pods-endpoint')
    app.addLegend = addLegend

    expect($('.legend').css('display')).toBe('none')

    app.addLegend()

    expect($('.desc').children().last().html()).toBe(legend.html())
    expect($('.legend').css('display')).toBe('block')

  })

  test('addLegend - active false', () => {
    expect.assertions(3)
    mockContent.messages.active = 'false'

    const app = new App(mockContent, 'http://pods-endpoint')
    app.addLegend = addLegend

    expect($('.legend').css('display')).toBe('none')

    app.addLegend()
    expect($('.desc').children().last().html()).toBe('')
    expect($('.legend').css('display')).toBe('none')

  })

})

describe('located', () => {
  const located = FinderApp.prototype.located
  const zoomToExtent = App.prototype.zoomToExtent

  beforeEach(() => {
    FinderApp.prototype.located = jest.fn()
    App.prototype.zoomToExtent = jest.fn()
  })

  afterEach(() => {
    FinderApp.prototype.located = located
    App.prototype.zoomToExtent = zoomToExtent
  })


 test('located', () => {
  expect.assertions(6)
  mockContent.messages.active = 'true'

  const app = new App(mockContent, 'http://pods-endpoint')
  const loc = {
    coordinate: 'mock-coordinate'
  }

  app.located(loc)

  expect(FinderApp).toHaveBeenCalledTimes(1)
  expect(FinderApp.prototype.located).toHaveBeenCalledTimes(1)
  expect(FinderApp.prototype.located.mock.calls[0][0]).toBe(loc)

  expect(App.prototype.zoomToExtent).toHaveBeenCalledTimes(1)
  expect(App.prototype.zoomToExtent.mock.calls[0][0]).toBe(loc.coordinate)
  expect(App.prototype.zoomToExtent.mock.calls[0][1]).toBe(3)

 })

})