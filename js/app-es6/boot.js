import {TradeController} from './controllers/TradeController';

let controller = new TradeController();

document.querySelector('.form').onsubmit = controller.add.bind(controller);
document.querySelector('[type=button]').onclick = controller.apaga.bind(controller);
