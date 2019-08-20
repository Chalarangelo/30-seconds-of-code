
var Ticket = require('./ticket');

function Tickets() {
  this.tickets = [];
}

Tickets.prototype._apply = function (fn, args) {
  this.tickets.forEach(function (ticket) {
    ticket[fn].apply(ticket, args);
  })
}

Tickets.prototype.push = function (ticket) {
  var self = this;
  if (ticket instanceof Tickets) {
    return ticket.tickets.forEach(function (ticket) {
      self.push(ticket)
    })
  }
  if (ticket instanceof Ticket) {
    if (self.tickets.indexOf(ticket) === -1) {
      self.tickets.push(ticket);
    }
  }
}

Object.keys(Ticket.prototype).forEach(function (method) {
  Tickets.prototype[method] = function () {
    this._apply(method, arguments);
  }
})

module.exports = Tickets;
