var fields = [
    document.querySelector('#date'),
    document.querySelector('#amount'),
    document.querySelector('#value')
];

console.log(fields);

var tbody = document.querySelector('table tbody');
document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    var tr = document.createElement('tr');

    fields.forEach(function(field) {
        
        var td = document.createElement('td');
        td.textContent = field.value;
        tr.appendChild(td);

    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = fields[1].value * fields[2].value;
    tr.appendChild(tdVolume);

    tbody.appendChild(tr);

    fields[0].value = '';
    fields[1].value = 1;
    fields[2].value = 0;
    
    fields[0].focus();
});