function savetoserver(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    const obj = {
        name,
        description,
        price,
        quantity
    }
    axios.post("https://crudcrud.com/api/1606b00affeb440db723628e8a7f9174/candylist", obj)
        .then((response) => {
            console.log(response);
            displayItems();
        }).catch((err) => {
            console.log(err);
        });
}

async function displayItems() {
    let ul = document.getElementById("listofitems");
    ul.innerHTML = '';

    try {
        const response = await axios.get("https://crudcrud.com/api/1606b00affeb440db723628e8a7f9174/candylist")
        const list = response.data;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            let li = document.createElement("li");

            let buyone = document.createElement('input');
            buyone.type = 'button';
            buyone.value = 'BUY ONE';
            buyone.addEventListener('click', () => {
                if (item.quantity >= 1) {
                    item.quantity -= 1;
                    updateItem(item);
                }
            });

            let buytwo = document.createElement('input');
            buytwo.type = 'button';
            buytwo.value = 'BUY TWO';
            buytwo.addEventListener('click', () => {
                if (item.quantity >= 2) {
                    item.quantity -= 2;
                    updateItem(item);
                }
            });

            let buythree = document.createElement('input');
            buythree.type = 'button';
            buythree.value = 'BUY THREE';
            buythree.addEventListener('click', () => {
                if (item.quantity >= 3) {
                    item.quantity -= 3;
                    updateItem(item);
                }
            });


            li.textContent = item.name + " ---- " + item.description + " ----- " + item.price + " ---- " + item.quantity
            li.appendChild(buyone)
            li.appendChild(buytwo)
            li.appendChild(buythree)
            ul.appendChild(li);

        }

    }
    catch (err) {
        console(err);
    }

}

async function updateItem(item) {
    try {
        await axios.put(`https://crudcrud.com/api/1606b00affeb440db723628e8a7f9174/candylist/${item._id}`, item);
        displayItems();
    } catch (err) {
        console.log(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayItems();
});
