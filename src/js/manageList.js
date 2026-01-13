import ListState from "./listState";

export default class ManageList {
  constructor(save) {
    this.listState = new ListState();
    this.saveInStorage = save;
    this.clickListeners = [];
    this.listEl = document.querySelector(".list");
    this.formEl = document.querySelector("#myForm");
    this.nameEl = document.querySelector("#name");
    this.priceEl = document.querySelector("#price");
    this.saveBtnEl = document.querySelector("#saveBtn");
    this.cancelBtnEl = document.querySelector("#cancelBtn");
    this.addGoodEl = document.querySelector(".add");
    this.actionsElArray = document.getElementsByName('actions');
    this.addGood = this.addGood.bind(this);
    this.outputGoodsList = this.outputGoodsList.bind(this);
    this.addGoodEl.addEventListener("click", () => {
      this.formEl.style.display = 'block';
    });
    this.cancelBtnEl.addEventListener("click", () => {
      this.formEl.style.display = 'none';
      this.nameEl.value = '';
      this.priceEl.value = '';
    })
    this.saveBtnEl.addEventListener("click", this.addGood);
  }

  loadList() {
    let obj = this.saveInStorage.getFromStorage();
    if (ListState.from(obj) !== null) {
      this.listState = ListState.from(obj);
    }
    this.outputTitle();
    this.outputGoodsList(this.listState.goodsArray);
    this.addActListeners();
    
  }

  addActListeners() {
    this.addEventClickListeners(this.whatToDo.bind(this))
  }

  addEventClickListeners(callback) {
    this.clickListeners.push(callback);
  }

  whatToDo(clickEl, x) {
    let ElRect = clickEl.getBoundingClientRect();
    let rowEl = clickEl.closest('tr');
    console.log(ElRect);
    console.log(x, clickEl.offsetWidth);
    if (x < clickEl.offsetWidth/2) {
      this.formEl.style.display = 'block';
      this.nameEl.value = rowEl.querySelector('.name').textContent;
      this.priceEl.value = rowEl.querySelector('.price').textContent;
    } else {
      let name = rowEl.querySelector('.name').textContent;
      console.log(this.listState.goodsArray);
      this.listState.goodsArray = this.listState.goodsArray.filter(item => item[0]!==name);
      this.saveInStorage.setInStorage(this.listState);
      console.log(this.listState.goodsArray);
      rowEl.remove();
    }
  }

  onActClick(event) {
    let clickEl = event.currentTarget;
    let x = event.offsetX;
    this.clickListeners.forEach(f => f.call(null, clickEl, x))
  }



  addGood(event) {
    event.preventDefault();
    this.priceEl.removeAttribute('placeholder');
    if (this.nameEl.value.trim() && Number(this.priceEl.value.trim())) {
      if (Number(this.priceEl.value.trim()) > 100) {
        this.listState.goodsArray = this.listState.goodsArray.filter(good => good[0] !== this.nameEl.value.trim() )
        this.listState.goodsArray.push([this.nameEl.value.trim(), Number(this.priceEl.value.trim())]);
        this.outputGoodsList(this.listState.goodsArray);
        this.saveInStorage.setInStorage(this.listState);
        this.formEl.style.display = 'none';
        this.nameEl.value = '';
        this.priceEl.value = '';
      } else {
        this.priceEl.value = '';
        this.priceEl.setAttribute('placeholder', 'Введите правильную цену товара');
      }
    } else {
      let rect = this.formEl.getBoundingClientRect();
      console.log("форма", rect.top, rect.left, rect.bottom);
      let popoverEl = document.createElement('div');
      popoverEl.classList.add('popover');
      popoverEl.textContent = "Внимательно введите данные по новому товару!";
      this.formEl.insertAdjacentElement('beforebegin', popoverEl);
      setTimeout(() => {popoverEl.style.visibility = 'hidden';
      }, 2000)
    }
  }

  outputTitle() {
  let rowElTitle = document.createElement("tr");
  rowElTitle.classList.add("title");
  for (let index = 0; index < 3; index++) {
    let cellElTitle = document.createElement("th");
    switch (index) {
      case 0:
        cellElTitle.textContent = "Название";
        break;
      case 1:
        cellElTitle.textContent = "Стоимость";
        break;
      case 2:
        cellElTitle.textContent = "Действия";
        break;
    }
    rowElTitle.append(cellElTitle);
    }
    this.listEl.append(rowElTitle);
  }

  outputGoodsList(goodsArray) {
    let rowArray = document.querySelectorAll('.row');
    if (rowArray) {
      for (const row of rowArray) {
        row.remove();
      }
    }
    for (const good of goodsArray) {
      let rowEl = document.createElement("tr");
      rowEl.classList.add("row");
      for (let index = 0; index < 3; index++) {
        let cellEl = document.createElement("td");
        switch (index) {
          case 0:
            cellEl.textContent = good[0];
            cellEl.classList.add("name");
            break;
          case 1:
            cellEl.textContent = good[1];
            cellEl.classList.add("price");
            break;
          case 2:
            cellEl.innerHTML = "&#215;";
            cellEl.setAttribute("name", "actions");
            break;
        }
        cellEl.addEventListener('click', event => this.onActClick(event));
        rowEl.append(cellEl);
        
      }
      this.listEl.append(rowEl);
    }
  }

  // addActionListener(array) {
  //   // let actionsElArray = document.querySelectorAll('[data-actions="actions"]');
  //   // let actionsElArray = Array.from(document.getElementsByName('actions'));
  //   let actionsElArray = Array.from(array);
  //   // console.log("Массив с actions", actionsElArray);
  //   for (const act of actionsElArray) {
  //     act.addEventListener('click', (event) => {
  //       let ElRect = act.getBoundingClientRect();
  //       let rowEl = act.closest('tr');
  //       console.log(ElRect);
  //       console.log(event.offsetX, event.offsetY, act.offsetWidth);
  //       if (event.offsetX < act.offsetWidth/2) {
  //         this.formEl.style.display = 'block';
  //         this.nameEl.value = rowEl.querySelector('.name').textContent;
  //         this.priceEl.value = rowEl.querySelector('.price').textContent;
  //       console.log(event.offsetX, event.offsetY, act.offsetWidth);
  //       } else {
  //       let name = rowEl.querySelector('.name').textContent;
  //       console.log(this.listState.goodsArray);
  //       this.listState.goodsArray = this.listState.goodsArray.filter(item => item[0]!==name);
  //       console.log(this.listState.goodsArray);
  //       rowEl.remove();
  //       }
  //     })
  //   }
  // }
}
