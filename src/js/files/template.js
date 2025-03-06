class TempalteConstrucor {
  constructor(templateButtons) {
    this.templateButtons = templateButtons;

    const places = {
      topRight: {
        id: "",
        value: flase,
      },
      bottomRight: {
        id: "",
        value: false,
      },
      bottomLeft: {
        id: "",
        value: false,
      },
      topLeft: {
        id: "",
        value: false,
      },
    };

    this.places = new Proxy(places, {
      get(target, place) {
        const isHas = target[place];

        if (isHas) {
          return target[place];
        } else {
          return false;
        }
      },
      set: (target, place, value) => {
        const isBusy = target[place].value;

        const {id} = value;

        if (!isBusy) {
          // освобождаем предыдущее место
          for (let key in target) {
            if (target[key]["id"] === id) {
              target[key] = {
                id: "",
                value: false,
              };
            }
          }

          target[place] = value;

          this.handleDisabledTemplateButtons();

          return true;
        } else {
          return false;
        }
      },
    });
  }

  handleDisabledTemplateButtons() {
    this.templateButtons.forEach((btn) => {
      const value = btn.value;
      // если место уже занято
      const isDisabled = this.places[value].value === true && btn.checked === false;

      if (isDisabled) {
        btn.setAttribute("disabled", "");
        btn.checked = false;
      } else {
        btn.removeAttribute("disabled");
      }
    });
  }

  changePlace(item, place) {
    if (!item) return;

    if (!this.places[place]) return;

    item.classList.remove(
      "_top-right",
      "_top-left",
      "_bottom-left",
      "_bottom-right"
    );

    switch (place) {
      case "topRight":
        this.setPlace(item, "topRight", "_top-right");
        break;

      case "bottomRight":
        this.setPlace(item, "bottomRight", "_bottom-right");
        break;

      case "bottomLeft":
        this.setPlace(item, "bottomLeft", "_bottom-left");
        break;

      case "topLeft":
        this.setPlace(item, "topLeft", "_top-left");
        break;

      default:
        break;
    }
  }

  setPlace(item, place, className) {
    try {
      let isBusy = this.places[place].value;

      // если место занято, то кидаем ошибку и дизейблим input
      if (isBusy) {
        const currInputs = document.querySelectorAll(`[data-template-toggle="${item.id}"]`);
        const currInput = Array.from(currInputs).find(input => input.value === place);

        currInput.checked = false;
        currInput.setAttribute("disabled", "");

        throw new Error("Место занято");
      }

      item.classList.add(className);
      this.places[place] = {
        id: item.id,
        value: true,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export function templateConstructor() {
  if (document.querySelector(".template")) {
    const templateButtons = document.querySelectorAll("[data-template-toggle]");

    const constructor = new TempalteConstrucor(templateButtons);

    constructor.handleDisabledTemplateButtons();

    if (templateButtons.length) {
      templateButtons.forEach((btn) => {
        const id = btn.dataset.templateToggle;
        const currentItem = document.querySelector(`#${id}`);

        if (btn.checked) {
          constructor.changePlace(currentItem, btn.value);
        }

        btn.addEventListener("change", () => {
          constructor.changePlace(currentItem, btn.value);
        });
      });
    }
  }
}
