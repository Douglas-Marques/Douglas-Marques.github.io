// Storage Controller
const StorageCtrl = (()=> {
  // Public items
  return {
    storeItem: item => {
      let items
      // Check if any items in ls
      if(localStorage.getItem('items') === null) {
        items = []
        // Push new item
        items.push(item)
        // Set ls
        localStorage.setItem('items', JSON.stringify(items))
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'))
        // Push new item
        items.push(item)
        // Reset ls
        localStorage.setItem('items', JSON.stringify(items))
      }
    },
    getItemsFromStorage: () => {
      if(localStorage.getItem('items') === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem('items'))
      }
      return items
    },
    updateItemStorage: upItem => {
      let items = JSON.parse(localStorage.getItem('items'))
      items.forEach((item, index) => {
        if(upItem.id === item.id) {
          items.splice(index, 1, upItem)
        }
      })
      localStorage.setItem('items', JSON.stringify(items))
    },
    deleteItemFromStorage: id => {
      let items = JSON.parse(localStorage.getItem('items'))
      items.forEach((item, index) => {
        if(id === item.id) {
          items.splice(index, 1)
        }
      })
      localStorage.setItem('items', JSON.stringify(items))
    },
    clearItemsFromStorage: () => {
      localStorage.removeItem('items')
    }
  }
})()

// Item Controller
const ItemCtrl = (() => {
  // Item Constructor
  function Item(id, name, values) {
    this.id = id
    this.name = name
    this.values = values
  }

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalvalues: 0
  }

  // Public methods
  return {
    getItems: () => {
      return data.items
    },
    addItem: (name, values) => {
      // Create ID
      let ID;
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1   
      } else {
        ID = 0
      }

      // values to number
      values = parseInt(values)
      // Create new item
      newItem = new Item(ID, name, values)
      // Add to items array
      data.items.push(newItem)
      return newItem
    },
    getItemById: id => {
      let found = null
      // Loop through items
      data.items.forEach(item => {
        if(item.id === id) {
          found = item
        }
      })
      return found
    },
    updateItem: (name, values) => {
      // values to number
      values = parseInt(values)
      let found = null
      data.items.forEach(item => {
        if(item.id === data.currentItem.id) {
          item.name = name
          item.values = values
          found = item
        }
      })
      return found
    },
    deleteItem: id => {
      // Get ids
      const ids = data.items.map(item => {
        return item.id
      })
      // Get index
      const index = ids.indexOf(id)
      // Removoe item
      data.items.splice(index, 1)
    },
    clearAllItems: () => {
      data.items = []
    },
    setCurrentItem: item => {
      data.currentItem = item
    },
    getCurrentItem: () => {
      return data.currentItem
    },
    getTotalvalues: () => {
      let total = 0
      // Loop through item and add cals
      data.items.forEach(item => {
        total += item.values       
      })
      // Set total cal in data structure
      data.totalvalues = total
      // Return total
      return data.totalvalues
    },
    logData: () => {
      return data
    }
  }
})()

// UI Controler
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemvaluesInput: '#item-values',
    totalvalues: '.total-values'
  }
  
  // Public methods
  return {
    populateItemList: items => {
      let html = ''
      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
                  <b>${item.name}: </b><em>${item.values} values</em>
                  <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
                 </li>`
      })
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        values: document.querySelector(UISelectors.itemvaluesInput).value
      }
    },
    addListItem: item => {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block'
      // Create li element
      const li = document.createElement('li')
      // Add class
      li.className = 'collection-item'
      // Add ID
      li.id = `item-${item.id}`
      // Add HTML
      li.innerHTML = `<b>${item.name}: </b><em>${item.values} values</em>
                      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>`
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemvaluesInput).value = ''
    },
    updateListItem: item => {
      let listItems = document.querySelectorAll(UISelectors.listItems)
      // Turn node list into array
      listItems = Array.from(listItems)
      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id')
        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<b>${item.name}: </b><em>${item.values} values</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>`
        }
      })
    },
    deleteListItem: id => {
      const itemID = `#item-${id}`
      const item = document.querySelector(itemID)
      item.remove()
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
      document.querySelector(UISelectors.itemvaluesInput).value = ItemCtrl.getCurrentItem().values
      UICtrl.showEditState()
    },
    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems)
      // Turn node list into array
      listItems = Array.from(listItems)
      listItems.forEach(item => item.remove())
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    showTotalvalues: totalvalues => {
      document.querySelector(UISelectors.totalvalues).textContent = totalvalues
    },
    clearEditState: () => {
      UICtrl.clearInput()
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'block'
    },
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = 'block'
      document.querySelector(UISelectors.deleteBtn).style.display = 'block'
      document.querySelector(UISelectors.backBtn).style.display = 'block'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
    },
    getSeletors: UISelectors
  }
})()

// App Controller
const App = ((ItemCtrl, UICtrl, StorageCtrl) => {
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSeletors
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    // Disable submit on enter
    document.addEventListener('keypress', e => {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)
    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)
    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click', backUI)
    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems)
  }

  // Add item submit
  const itemAddSubmit = e => {
    const input = UICtrl.getItemInput()
    // Check for name and value input
    if(input.name !== '' && input.values !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.values)
      // Add item to UI list
      UICtrl.addListItem(newItem)
      // Get total values
      const totalvalues = ItemCtrl.getTotalvalues()
      // Add total values to UI
      UICtrl.showTotalvalues(totalvalues)
      // Storage in localstorage
      StorageCtrl.storeItem(newItem)
      // Clear fields
      UICtrl.clearInput()
    }
    e.preventDefault()    
  }

  // Edit item
  const itemEditClick = e => {
    if(e.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id
      // Break into an array
      const listIdArr = listId.split('-')
      // Get the actual id
      const id = parseInt(listIdArr[1])
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id)
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit)
      // Add item to form
      UICtrl.addItemToForm()
    }
    e.preventDefault()
  }

  // Update item submit
  const itemUpdateSubmit = e => {
    // Get item input
    const input = UICtrl.getItemInput()
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.values)
    // Update UI
    UICtrl.updateListItem(updatedItem)
    // Get total values
    const totalvalues = ItemCtrl.getTotalvalues()
    // Add total values to UI
    UICtrl.showTotalvalues(totalvalues)
    // Update ls
    StorageCtrl.updateItemStorage(updatedItem)
    UICtrl.clearEditState()
    e.preventDefault()
  }

  // Delete item
  const itemDeleteSubmit = e => {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem()
    // Delete from structure
    ItemCtrl.deleteItem(currentItem.id)
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id)
    // Get total values
    const totalvalues = ItemCtrl.getTotalvalues()
    // Add total values to UI
    UICtrl.showTotalvalues(totalvalues)
    // Delete from ls
    StorageCtrl.deleteItemFromStorage(currentItem.id)
    UICtrl.clearEditState()
    if(totalvalues === 0) {
      // Hide de UL
      UICtrl.hideList()
    }
    e.preventDefault()
  }

  // Back once
  const backUI = e => {
    UICtrl.clearEditState()
    e.preventDefault()
  }

  // Clear items event
  const clearAllItems = e => {
    // Delete all items from data structure
    ItemCtrl.clearAllItems()  
    // Get total values
    const totalvalues = ItemCtrl.getTotalvalues()
    // Add total values to UI
    UICtrl.showTotalvalues(totalvalues)
    // Remove from UI
    UICtrl.removeItems()
    // Clear from ls
    StorageCtrl.clearItemsFromStorage()
    // Hide de UL
    UICtrl.hideList()
    e.preventDefault()
  }

  // Public methods
  return {
    init: () => {
      // Clear edit state / set inital set
      UICtrl.clearEditState()
      // Fetch items from data sctructure
      const items = ItemCtrl.getItems()
      // Check if any items
      if(items.length === 0) {
        UICtrl.hideList()
      } else {
        // Populate list with items
        UICtrl.populateItemList(items)
      }
      // Get total values
      const totalvalues = ItemCtrl.getTotalvalues()
      // Add total values to UI
      UICtrl.showTotalvalues(totalvalues)
      // Load event listeners
      loadEventListeners()
    }
  }
})(ItemCtrl, UICtrl, StorageCtrl)

// Initialize App
App.init()
