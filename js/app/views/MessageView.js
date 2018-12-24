class MessageView {

    constructor(element) {
        this._element = element;
    }

    update(message) {
        this._element.innerHTML = this._template(message);
    }

    _template(message) {
        return message.text ? `<p class="alert alert-info">${message.text}</p>` : '<p></p>';
    }
}