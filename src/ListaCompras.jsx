import React, { useEffect, useState, useRef } from 'react'

function ListaCompras() {

    const [listInput, setListInput] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("listItems") != '[]' && items.length == 0) {
            setItems(i => JSON.parse(localStorage.getItem("listItems")))
            return;
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("listItems", JSON.stringify(items));
    }, [items])

    function handleInputChange(e) {
        setListInput(l => e.target.value);
    }

    function handleAddItem() {
        if(listInput.trim() === ''){
            return
        }
        setItems(i => [...i, listInput]);
        setListInput(l => '')
    }

    function handleRemoveItem(index) {
        setItems(i => i.filter((_, i) => i !== index))
    }

    function handleEditItem(index) {
        setListInput(l => items[index])
        setItems(i => items.filter((_, i) => i !== index))
        document.querySelector("#inputLista").focus()
    }

    function moveItemUp(index) {
        if (index <= 0) {
            return
        }

        let tempA = items[index]
        let tempB = items[index - 1]
        let updatedItems = [...items]
        updatedItems[index] = tempB
        updatedItems[index - 1] = tempA

        setItems(i => [...updatedItems])
    }

    function moveItemDown(index) {

        if (index >= items.length - 1) {
            return
        }

        let tempA = items[index]
        let tempB = items[index + 1]
        let updatedItems = [...items]
        updatedItems[index] = tempB
        updatedItems[index + 1] = tempA

        setItems(i => [...updatedItems])

    }

    function handleDeleteAll(){
        setItems(i => [])
    }


    return (
        <div className="container">
            <h1>Lista de compras</h1>
            <div className="containerInput">
                <div>
                    <input type="text" id="inputLista" placeholder="Novo item" value={listInput} onChange={handleInputChange} onKeyDown={ (e) => {e.key === "Enter" && handleAddItem(e)}} autoComplete='off'/>
                    <button onClick={handleAddItem} className='button-add'>+</button>
                </div>
            </div>
            <div className="containerLista">
                <ul>
                    {items.map((name, index) =>
                        <li key={index}>
                            <span>{name}</span>
                            <div className="buttons">
                                <button onClick={() => handleRemoveItem(index)} className='button-remove'>🗑️</button>
                                <button onClick={() => handleEditItem(index)} className='button-edit'>✏️</button>
                                <button onClick={() => moveItemDown(index)} className='button-up'>👇</button>
                                <button onClick={() => moveItemUp(index)} className='button-down'>👆</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <button onClick={handleDeleteAll} className='delete-all-button'>Apagar tudo</button>
        </div>
    );
}

export default ListaCompras;