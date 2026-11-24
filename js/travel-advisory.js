const travelPanels = [...document.querySelectorAll('.travel-panel[id]')];
const travelControls = [...document.querySelectorAll('[data-travel-panel]')];
const travelGroupToggles = [...document.querySelectorAll('[data-travel-toggle]')];
const detailToggles = [...document.querySelectorAll('[data-detail-toggle]')];

const routeData = {
  'M-1': {
    length: '155 km',
    mappedInterchanges: [
      { name: 'Peshawar Interchange', position: [34.0306506, 71.6649159] },
      { name: 'Charsadda Interchange', position: [34.1193918, 71.7897428] },
      { name: 'Rashakai Interchange', position: [34.1083274, 72.0169017] },
      { name: 'Wali Interchange', position: [34.0666103, 72.1118028] },
      { name: 'Karnal Sher Kha Interchange', position: [34.0681727, 72.2134543] },
      { name: 'Swabi Interchange', position: [34.042651, 72.4090539] },
      { name: 'Chach Interchange', position: [33.928867, 72.5094185] },
      { name: 'Ghazi Interchange', position: [33.8886858, 72.5480962] },
      { name: 'Burhan Interchange', position: [33.8252483, 72.6280615] },
      { name: 'Brahma Interchange', position: [33.7439189, 72.7044219] },
      { name: 'Fateh Jhang Interchange', position: [33.6085146, 72.8605628] },
      { name: 'Hakla Interchange', position: [33.612561, 72.8586574] },
      { name: 'Islamabad Interchange', position: [33.5905916, 72.8709022] }
    ],
    points: [
      { name: 'Peshawar', position: [34.015, 71.525], type: 'start' },
      { name: 'Rashakai', position: [34.059, 72.052] },
      { name: 'Swabi', position: [34.121, 72.469] },
      { name: 'Burhan Interchange', position: [33.957, 72.726] },
      { name: 'Islamabad', position: [33.684, 73.047], type: 'end' }
    ]
  },
  'M-2': {
    length: '367 km',
    mappedInterchanges: [
      { name: 'Lahore Interchange', position: [31.5745815, 74.2290492] },
      { name: 'Shahpur Interchange', position: [31.4660196, 74.2292511] },
      { name: 'Babu Sabu Interchange', position: [31.5384907, 74.2620485] },
      { name: 'Faizpur Interchange', position: [31.5948697, 74.2175979] },
      { name: 'Kot Abdul Malik Interchange', position: [31.6345289, 74.20682] },
      { name: 'Kala Shah Kaku Interchange', position: [31.6783299, 74.1977493] },
      { name: 'Sheikhupura Interchange', position: [31.7479195, 74.008285] },
      { name: 'Khanqah Dogar Interchange', position: [31.8727226, 73.6671951] },
      { name: 'Kot Sarwar Interchange', position: [31.916815, 73.5012507] },
      { name: 'Pindi Bhattian Interchange', position: [31.9308596, 73.2839168] },
      { name: 'Makhdoom Interchange', position: [31.9732102, 73.1115879] },
      { name: 'Kot Momin Interchange', position: [32.1880927, 73.0376325] },
      { name: 'Salam Chowk Interchange', position: [32.316598, 73.0213171] },
      { name: 'Bhera Interchange', position: [32.4614364, 72.8791272] },
      { name: 'Lilla Interchange', position: [32.5764867, 72.8021433] },
      { name: 'Kalar Kehar Interchange', position: [32.7874306, 72.7125414] },
      { name: 'Balkasar Interchange', position: [32.9380631, 72.6840565] },
      { name: 'Neela Dullah', position: [33.1655047, 72.6525879] },
      { name: 'Chakri Interchange', position: [33.3087038, 72.7788126] },
      { name: 'Thalian Interchange', position: [33.5380166, 72.900247] },
      { name: 'Islamabad Interchange', position: [33.5905916, 72.8709022] }
    ],
    points: [
      { name: 'Lahore (Shahpur Interchange)', position: [31.466075, 74.229153] },
      { name: 'Bhera', position: [32.4614364, 72.8791272] },
      { name: 'Kallar Kahar', position: [32.7874306, 72.7125414] },
      { name: 'Chakri', position: [33.3087038, 72.7788126] },
      { name: 'Islamabad Interchange', position: [33.590853, 72.869725] }
    ]
  },
  'M-3': {
    length: '230 km',
    mappedInterchanges: [
      { name: 'Lahore Interchange', position: [31.5745815, 74.2290492] },
      { name: 'Dhamaka Interchange', position: [31.5287998, 74.1481018] },
      { name: 'Mangtanwala Interchange', position: [31.4055169, 73.7649107] },
      { name: 'Jaranwala Interchange', position: [31.2415403, 73.4594768] },
      { name: 'Samundri Interchange', position: [31.0380567, 73.0287516] },
      { name: 'Rajana Interchange', position: [30.8415023, 72.5579381] },
      { name: 'Pir Mahal Interchange', position: [30.7883731, 72.4250078] },
      { name: 'Abdul Hakeem Interchange', position: [30.65115, 72.126651] }
    ],
    points: [
      { name: 'Lahore (M-3 interchange)', position: [31.72, 74.19], type: 'start' },
      { name: 'Sheikhupura', position: [31.713, 73.978] },
      { name: 'Nankana Sahib', position: [31.45, 73.70] },
      { name: 'Abdul Hakeem', position: [30.548, 72.235], type: 'end' }
    ]
  },
  'M-4': {
    length: '309 km',
    mappedInterchanges: [
      { name: 'Pindi Bhattian Interchange', position: [31.9308596, 73.2839168] },
      { name: 'Sangla Hill Interchange', position: [31.76824, 73.265896] },
      { name: 'Sahianwala Interchange', position: [31.6657535, 73.2182697] },
      { name: 'Deputy Wala Interchange', position: [31.5699594, 73.1140251] },
      { name: 'Kamalpur Interchange', position: [31.517445, 73.0660918] },
      { name: 'Aminpur Interchange', position: [31.4583363, 72.9634845] },
      { name: 'Charagabad Interchange', position: [31.3344201, 72.774719] },
      { name: 'Gojra Interchange', position: [31.1698463, 72.6213368] },
      { name: 'Toba Tek Singh Interchange', position: [31.046285, 72.443452] },
      { name: 'Waryamwala Interchange', position: [30.965549, 72.338019] },
      { name: 'Shorkot Interchange', position: [30.8215267, 72.1504972] },
      { name: 'Abdul Hakeem Interchange', position: [30.65115, 72.126651] },
      { name: 'Dinpur Interchange', position: [30.561762, 72.083792] },
      { name: 'Makhdumpur Interchange', position: [30.441196, 71.972953] },
      { name: 'Kabirwala Interchange', position: [30.360187, 71.890407] },
      { name: 'Khanewal Interchange', position: [30.325856, 71.852225] },
      { name: 'Shah Rukenalam Interchange', position: [30.1367792, 71.5701283] },
      { name: 'Shah Shams Tabraiz Interchange', position: [30.0957882, 71.4929177] },
      { name: 'Sher Shah Interchange', position: [30.0802545, 71.4022371] }
    ],
    points: [
      { name: 'Pindi Bhattian', position: [31.90, 73.271], type: 'start' },
      { name: 'Faisalabad', position: [31.45, 73.135] },
      { name: 'Gojra', position: [31.15, 72.68] },
      { name: 'Shorkot', position: [30.85, 72.08] },
      { name: 'Multan', position: [30.20, 71.47], type: 'end' }
    ]
  },
  'M-5': {
    length: '392 km',
    mappedInterchanges: [
      { name: 'Sher Shah Interchange', position: [30.0802545, 71.4022371] },
      { name: 'Shujaabad Interchange', position: [29.8250637, 71.3718218] },
      { name: 'Jalalpur Pirwala Interchange', position: [29.4992474, 71.2483337] },
      { name: 'Uch Sharif Interchange', position: [29.2471271, 71.0407305] },
      { name: 'Taranda M. Panah Interchange', position: [29.1162125, 70.8586192] },
      { name: 'Zahir Pir Interchange', position: [28.8474554, 70.5059624] },
      { name: 'Bahadurpur Interchange', position: [28.6573753, 70.2635473] },
      { name: 'Guddu Interchange', position: [28.330746, 69.7865404] },
      { name: 'Ghotki Interchange', position: [28.0080235, 69.2694104] },
      { name: 'Pano Aqal Interchange', position: [27.8227381, 69.0582991] },
      { name: 'Sukkur Interchange', position: [27.6615603, 68.9379881] }
    ],
    points: [
      { name: 'Multan', position: [30.20, 71.47], type: 'start' },
      { name: 'Bahawalpur', position: [29.395, 71.683] },
      { name: 'Rahim Yar Khan', position: [28.42, 70.30] },
      { name: 'Ghotki', position: [28.00, 69.32] },
      { name: 'Sukkur', position: [27.705, 68.857], type: 'end' }
    ]
  },
  'M-9': {
    length: '136 km',
    mappedInterchanges: [
      { name: 'Malir Interchange', position: [24.9849, 67.212627] },
      { name: 'Memon Goth Interchange', position: [24.9759585, 67.2680962] },
      { name: 'Lucky Cement Interchange', position: [25.0630052, 67.4903548] },
      { name: 'Dada Bhoy', position: [25.1575795, 67.6675737] },
      { name: 'Industrial Valley Interchange', position: [25.1695437, 67.721098] },
      { name: 'Nooriabad Interchange', position: [25.1773012, 67.7991897] },
      { name: 'Thano Bulla Khan Interchange', position: [25.2466756, 67.9512119] },
      { name: 'Bholari Interchange', position: [25.3522772, 68.1838775] }
    ],
    points: [
      { name: 'Karachi', position: [24.86, 67.01], type: 'start' },
      { name: 'Kathore', position: [25.02, 67.37] },
      { name: 'Nooriabad', position: [25.10, 67.70] },
      { name: 'Hyderabad', position: [25.396, 68.357], type: 'end' }
    ]
  }
};

const routeMapElement = document.getElementById('route-map');
const routeMapStatus = document.getElementById('route-map-status');
let routeMap;
let routeLayers;
let routeRequestId = 0;
let currentRoutePoints = [];

const setRouteMapStatus = (message, isError) => {
  if (!routeMapStatus) return;
  routeMapStatus.textContent = message;
  routeMapStatus.classList.toggle('is-error', Boolean(isError));
  routeMapStatus.hidden = !message;
};

const initializeRouteMap = () => {
  if (!routeMapElement || !window.L) {
    setRouteMapStatus('The interactive map could not be loaded. Check your connection and reload.', true);
    console.error('Leaflet map library is unavailable.');
    return false;
  }

  if (routeMap) return true;

  routeMap = window.L.map(routeMapElement, {
    scrollWheelZoom: false,
    zoomControl: false
  });
  window.L.control.zoom({ position: 'topright' }).addTo(routeMap);
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(routeMap);
  routeLayers = window.L.layerGroup().addTo(routeMap);
  routeMap.setView([30.9, 72.8], 6);
  routeMap.on('tileerror', () => {
    setRouteMapStatus('Some map tiles could not load. Check your internet connection.', true);
  });
  return true;
};

const createRoutePin = (type) => window.L.divIcon({
  className: 'route-map-pin-wrapper',
  html: `<span class="route-map-pin route-map-pin-${type}" aria-hidden="true"></span>`,
  iconSize: type === 'endpoint' ? [24, 24] : type === 'rest-area' || type === 'toll-plaza' ? [22, 22] : [18, 18],
  iconAnchor: type === 'endpoint' ? [12, 12] : type === 'rest-area' || type === 'toll-plaza' ? [11, 11] : [9, 9]
});

const getRoutePositionAt = (coordinates, fraction) => {
  const segmentLengths = [];
  let totalLength = 0;

  for (let index = 1; index < coordinates.length; index += 1) {
    const [lon1, lat1] = coordinates[index - 1];
    const [lon2, lat2] = coordinates[index];
    const radians = Math.PI / 180;
    const deltaLat = (lat2 - lat1) * radians;
    const deltaLon = (lon2 - lon1) * radians;
    const arc = 2 * Math.asin(Math.sqrt(
      Math.sin(deltaLat / 2) ** 2
      + Math.cos(lat1 * radians) * Math.cos(lat2 * radians) * Math.sin(deltaLon / 2) ** 2
    ));
    const segmentLength = 6371000 * arc;
    segmentLengths.push(segmentLength);
    totalLength += segmentLength;
  }

  let targetLength = totalLength * fraction;
  for (let index = 0; index < segmentLengths.length; index += 1) {
    const segmentLength = segmentLengths[index];
    if (targetLength <= segmentLength) {
      const ratio = segmentLength ? targetLength / segmentLength : 0;
      const [lon1, lat1] = coordinates[index];
      const [lon2, lat2] = coordinates[index + 1];
      return [lat1 + (lat2 - lat1) * ratio, lon1 + (lon2 - lon1) * ratio];
    }
    targetLength -= segmentLength;
  }

  const [longitude, latitude] = coordinates[coordinates.length - 1];
  return [latitude, longitude];
};

const renderRestAreas = (coordinates, routeCode) => {
  const list = document.getElementById('route-rest-areas-list');
  if (!list) return;

  list.replaceChildren();
  const note = document.getElementById('route-rest-areas-note');
  const legendItem = document.getElementById('route-rest-legend-item');
  legendItem.hidden = false;
  note.textContent = 'Green markers show illustrative demo stops along the route, not verified NHA rest-area locations. Check NHA updates before travelling.';
  [0.33, 0.67].forEach((fraction, index) => {
    const name = `Indicative rest-area stop ${index + 1}`;
    const position = getRoutePositionAt(coordinates, fraction);
    const marker = window.L.marker(position, {
      icon: createRoutePin('rest-area'),
      keyboard: true,
      title: name
    });
    marker.bindTooltip(`Rest area ${index + 1} (demo)`, {
      permanent: true,
      direction: index === 0 ? 'bottom' : 'top',
      offset: index === 0 ? [0, 24] : [0, -24],
      className: 'rest-area-map-label'
    });
    marker.bindPopup(`${name}. This is a demo location, not a verified facility.`);
    marker.addTo(routeLayers);

    const item = document.createElement('li');
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-location-dot';
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.textContent = name;
    item.append(icon, text);
    list.append(item);
  });
};

const renderTollPlazas = (coordinates, routeCode) => {
  const list = document.getElementById('route-toll-plazas-list');
  if (!list) return;

  list.replaceChildren();
  const route = routeData[routeCode];
  const note = document.getElementById('route-toll-plazas-note');
  if (route.mappedInterchanges) {
    note.textContent = 'Names and coordinates are from the supplied NHA Interactive Map (DRAFT), which marks interchanges rather than toll plazas separately.';
    route.mappedInterchanges.forEach(({ name, position }) => {
      const marker = window.L.marker(position, {
        icon: createRoutePin('toll-plaza'),
        keyboard: true,
        title: name
      });
      marker.bindTooltip(name, {
        direction: 'top',
        offset: [0, -10],
        sticky: true,
        className: 'toll-plaza-map-label'
      });
      marker.bindPopup(`${name}. Listed as an interchange on the supplied NHA DRAFT map; toll plaza details are not separately identified.`);
      marker.addTo(routeLayers);

      const item = document.createElement('li');
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-location-dot';
      icon.setAttribute('aria-hidden', 'true');
      const text = document.createElement('span');
      text.textContent = name;
      item.append(icon, text);
      list.append(item);
    });
    return;
  }

  note.textContent = 'Yellow markers are indicative demo points, not verified NHA toll-plaza locations. Check official NHA information before travelling.';
  [0.2, 0.8].forEach((fraction, index) => {
    const name = `Indicative toll plaza ${index + 1}`;
    const position = getRoutePositionAt(coordinates, fraction);
    const marker = window.L.marker(position, {
      icon: createRoutePin('toll-plaza'),
      keyboard: true,
      title: name
    });
    marker.bindTooltip(`Toll plaza ${index + 1} (demo)`, {
      permanent: true,
      direction: index === 0 ? 'top' : 'bottom',
      offset: index === 0 ? [0, -10] : [0, 9],
      className: 'toll-plaza-map-label'
    });
    marker.bindPopup(`${name}. This is a demo location, not a verified facility.`);
    marker.addTo(routeLayers);

    const item = document.createElement('li');
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-location-dot';
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.textContent = name;
    item.append(icon, text);
    list.append(item);
  });
};

const updateRouteMap = async (code) => {
  const route = routeData[code];
  if (!route || !initializeRouteMap()) return;

  const requestId = ++routeRequestId;
  routeLayers.clearLayers();
  currentRoutePoints = route.points;
  document.getElementById('route-length').textContent = route.length;
  document.getElementById('route-toll-plaza-count').textContent = route.mappedInterchanges ? String(route.mappedInterchanges.length) : '2';
  document.getElementById('route-toll-count-label').textContent = route.mappedInterchanges ? 'Mapped interchanges' : 'Toll plazas';
  document.getElementById('route-drive-time').textContent = 'Loading';
  document.getElementById('route-network').textContent = code;
  setRouteMapStatus('Loading road route…', false);

  route.points.filter((point) => point.type).forEach((point) => {
    const marker = window.L.marker(point.position, {
      icon: createRoutePin('endpoint'),
      keyboard: true,
      title: point.name
    });
    marker.bindTooltip(point.name, { direction: 'top', offset: [0, -8], sticky: true });
    marker.bindPopup(point.name);
    marker.addTo(routeLayers);
    marker.setZIndexOffset(1000);
  });

  const fallbackCoordinates = route.points.map((point) => point.position);
  const drawRouteLine = (coordinates, routeClass) => {
    window.L.polyline(coordinates, {
      color: '#ffffff',
      weight: 9,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(routeLayers);
    return window.L.polyline(coordinates, {
      color: '#142a4f',
      weight: 5,
      opacity: 0.98,
      dashArray: '10 9',
      lineCap: 'round',
      lineJoin: 'round',
      className: routeClass
    }).addTo(routeLayers);
  };

  try {
    const [start, end] = [route.points[0].position, route.points[route.points.length - 1].position];
    const coordinates = `${start[1]},${start[0]};${end[1]},${end[0]}`;
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`);
    if (!response.ok) throw new Error(`Routing service returned ${response.status}`);
    const result = await response.json();
    const routeResult = result.routes && result.routes[0];
    if (result.code !== 'Ok' || !routeResult || !routeResult.geometry?.coordinates?.length) {
      throw new Error('No road route was returned.');
    }
    if (requestId !== routeRequestId) return;

    const line = drawRouteLine(routeResult.geometry.coordinates.map(([longitude, latitude]) => [latitude, longitude]), 'animated-route');
    renderTollPlazas(routeResult.geometry.coordinates, code);
    renderRestAreas(routeResult.geometry.coordinates, code);
    const minutes = Math.round(routeResult.duration / 60);
    const hours = Math.floor(minutes / 60);
    document.getElementById('route-drive-time').textContent = hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
    setRouteMapStatus('', false);
    routeMap.fitBounds(line.getBounds().pad(0.16));
  } catch (error) {
    if (requestId !== routeRequestId) return;
    drawRouteLine(fallbackCoordinates, 'animated-route');
    renderTollPlazas(fallbackCoordinates.map(([latitude, longitude]) => [longitude, latitude]), code);
    renderRestAreas(fallbackCoordinates.map(([latitude, longitude]) => [longitude, latitude]), code);
    document.getElementById('route-drive-time').textContent = '—';
    setRouteMapStatus('Live road routing is unavailable. Showing route waypoints instead.', true);
    console.error('Could not load the road route:', error);
    routeMap.fitBounds(window.L.latLngBounds(fallbackCoordinates).pad(0.16));
  }

  window.requestAnimationFrame(() => routeMap.invalidateSize());
};

const resetDetails = () => {
  detailToggles.forEach((button) => {
    const content = document.getElementById(button.getAttribute('aria-controls'));
    if (!content) {
      console.error(`Travel advisory detail content not found: ${button.getAttribute('aria-controls')}`);
      return;
    }

    content.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'View Detail';
  });
};

const getAncestorGroups = (control) => {
  const ancestors = [];
  let subnav = control.closest('.travel-subnav');

  while (subnav) {
    const parentToggle = subnav.previousElementSibling;
    if (parentToggle?.matches('[data-travel-toggle]')) {
      ancestors.push(parentToggle);
      subnav = parentToggle.closest('.travel-subnav');
    } else {
      break;
    }
  }

  return ancestors.reverse();
};

const setExpandedGroups = (expandedGroups) => {
  travelGroupToggles.forEach((toggle) => {
    const subnav = document.getElementById(toggle.dataset.travelToggle);
    if (!subnav) {
      console.error(`Travel advisory navigation group not found: ${toggle.dataset.travelToggle}`);
      return;
    }

    const isExpanded = expandedGroups.includes(toggle);
    subnav.hidden = !isExpanded;
    toggle.setAttribute('aria-expanded', String(isExpanded));
  });
};

const showTravelPanel = (control) => {
  const selectedPanel = document.getElementById(control.dataset.travelPanel);
  if (!selectedPanel) {
    console.error(`Travel advisory section not found: ${control.dataset.travelPanel}`);
    return false;
  }

  travelPanels.forEach((panel) => {
    panel.hidden = panel !== selectedPanel;
  });
  resetDetails();

  travelControls.forEach((button) => {
    const isSelected = button === control;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });

  if (control.dataset.mapTitle) {
    const title = selectedPanel.querySelector('#travel-map-detail-title');
    if (title) {
      title.textContent = control.dataset.mapTitle;
    }
  }

  if (control.dataset.routeTitle) {
    const title = selectedPanel.querySelector('#travel-road-detail-title');
    if (title) {
      title.textContent = control.dataset.routeTitle;
    }
    updateRouteMap(control.dataset.routeCode);
  }

  if (control.dataset.tollTitle) {
    const title = selectedPanel.querySelector('#travel-toll-plazas-detail-title');
    if (title) {
      title.textContent = control.dataset.tollTitle;
    }
  }

  return true;
};

const activateTravelControl = (control) => {
  if (control.matches('[data-travel-toggle]')) {
    const currentSubnav = document.getElementById(control.dataset.travelToggle);
    if (!currentSubnav) {
      console.error(`Travel advisory navigation group not found: ${control.dataset.travelToggle}`);
      return;
    }

    const shouldExpand = currentSubnav.hidden;
    const expandedGroups = getAncestorGroups(control);
    if (shouldExpand) {
      expandedGroups.push(control);
    }
    setExpandedGroups(expandedGroups);
    showTravelPanel(control);
    return;
  }

  setExpandedGroups(getAncestorGroups(control));
  showTravelPanel(control);
};

travelControls.forEach((control) => {
  control.addEventListener('click', () => activateTravelControl(control));
});

detailToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const content = document.getElementById(button.getAttribute('aria-controls'));
    if (!content) {
      console.error(`Travel advisory detail content not found: ${button.getAttribute('aria-controls')}`);
      return;
    }

    const isExpanded = content.hidden;
    content.hidden = !isExpanded;
    button.setAttribute('aria-expanded', String(isExpanded));
    button.textContent = isExpanded ? 'Hide Detail' : 'View Detail';
  });
});

const downloadButton = document.getElementById('download-route-map');
if (downloadButton) {
  downloadButton.addEventListener('click', () => {
    const title = document.getElementById('travel-road-detail-title')?.textContent || 'Motorway';
    const length = document.getElementById('route-length')?.textContent || '';
    const content = [
      title,
      `Length: ${length}`,
      '',
      'Key route locations:',
      ...currentRoutePoints.map((point) => `- ${point.name} (${point.position[0]}, ${point.position[1]})`),
      '',
      'Map data: OpenStreetMap contributors',
      'Routing: OSRM'
    ].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}-route-details.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

const initialRouteControl = travelControls.find((control) => control.classList.contains('is-active'));
if (initialRouteControl) {
  showTravelPanel(initialRouteControl);
}
