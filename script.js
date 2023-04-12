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
    axios.post("https://crudcrud.com/api/03f781ef7c7b4cd0928c9659c1937cca/candylist", obj)
        .then((response) => {
            console.log(response);
            displayItems();
            event.target.reset();
        }).catch((err) => {
            console.log(err);
        });
}




async function displayItems() {
    let ul = document.getElementById("listofitems");

    let li = "";

    try {
        const response = await axios.get("https://crudcrud.com/api/03f781ef7c7b4cd0928c9659c1937cca/candylist")
        const list = response.data;

        for (var i = 0; i < list.length; i++) {
            //storing the key into item
            var item = list[i];
            var id = item._id;
            li += `<li> Candy Name : ${item.name}--- Price : ${item.price}₹ ---- Description : ${item.description}----  Quantity : ${item.quantity} 
            <button id="btnone"  class="btn btn-warning" type="button" onclick=addonefunc("${id}","${item.name}","${item.price}","${item.description}","${item.quantity}")>Buy One</button>
            <button id="btntwo" class="btn btn-warning" type="button" onclick=addtwofunc("${id}","${item.name}","${item.price}","${item.description}","${item.quantity}")>Buy Two</button> 
            <button id="btnthree" class="btn btn-warning" type="button" onclick=addthreefunc("${id}","${item.name}","${item.price}","${item.description}","${item.quantity}")>Buy Three</button>  
            </li>`

            ul.innerHTML = li;

        }


    }
    catch (err) {
        console.log(err);
    }

}
//function for Buy one Button
function addonefunc(id, name, price, description, quantity) {
    console.log(id, name, price, description, quantity);
    if (quantity >= 1) {
        quantity = Number(quantity) - 1;
    }
    else {
        alert('Not enoungh candies left in store');
    }
    const candyDetails = {
        name,
        price,
        description,
        quantity,
    };
    try {
        axios
            .put(
                `https://crudcrud.com/api/03f781ef7c7b4cd0928c9659c1937cca/candylist/${id}`,
                candyDetails
            )
            .then((response) => {
                console.log(response);
                displayItems();
            })

            .catch((error) => {

                console.log(error);
            });
    }
    catch (err) {
        console.log(err);
    }
}
//function for Buy two Button
function addtwofunc(id, name, price, description, quantity) {
    console.log(id, name, price, description, quantity);
    if (quantity >= 2) {
        quantity = Number(quantity) - 2;
    }
    else {
        alert('Not enoungh candies left in store');
    }
    const candyDetails = {
        name,
        price,
        description,
        quantity,
    };
    axios
        .put(
            `https://crudcrud.com/api/03f781ef7c7b4cd0928c9659c1937cca/candylist/${id}`,
            candyDetails
        )
        .then((response) => {
            console.log(response);
            displayItems();
        })
        .catch((error) => {

            console.log(error);
        });
}
//function for Buy three Button
function addthreefunc(id, name, price, description, quantity) {
    console.log(id, name, price, description, quantity);
    if (quantity >= 3) {
        quantity = Number(quantity) - 3;
    }
    else {
        alert('Not enoungh candies left in store');
    }
    const candyDetails = {
        name,
        price,
        description,
        quantity,
    };
    axios
        .put(
            `https://crudcrud.com/api/03f781ef7c7b4cd0928c9659c1937cca/candylist/${id}`,
            candyDetails
        )
        .then((response) => {
            console.log(response);
            displayItems();
        })
        .catch((error) => {

            console.log(error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    displayItems();
});
