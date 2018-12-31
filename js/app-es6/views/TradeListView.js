import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';

export class TradeListView extends View {

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>AMOUNT</th>
                    <th>VALUE</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${
                    model.trades.map(t => 
                        `
                            <tr>
                                <td>${DateHelper.dateToText(t.date)}</td>
                                <td>${t.amount}</td>
                                <td>${t.value}</td>
                                <td>${t.volume}</td>
                            </tr>
                        `
                    ).join('')
                }
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>${model.trades.reduce((total, t) => total + t.volume, 0.0)}</td>
            </tfoot>
        </table>
        `;
    }
}