const { MapControl } = require('react-leaflet');
const L = require('leaflet');

module.exports = class ToolControl extends MapControl {

  createLeafletElement() {
    return L.control.watermark({ position: 'topleft', onClick: x => console.log(x) });
  }

}

L.Control.Watermark = L.Control.extend({

  onAdd() {
    const container = L.DomUtil.create('div');

    const bg = L.DomUtil.create('div', 'btn-group-vertical', container);

    [ 'record', 'triangle-top', 'flag', 'move', 'remove' ].forEach(h => {
      const b = L.DomUtil.create('button', 'btn btn-default btn-sm', bg);
      b.innerHTML = `<span class="glyphicon glyphicon-${h}" aria-hidden="true"></span>`;

      L.DomEvent.disableClickPropagation(b);
      L.DomEvent.on(b, 'click', L.DomEvent.stop);
      L.DomEvent.on(b, 'click', this.options.onClick.bind(this, 'x'));
    });

    return container;
  },

  onRemove() {
    // nothing to do here
  }

});

L.control.watermark = function (opts) {
  return new L.Control.Watermark(opts);
}
