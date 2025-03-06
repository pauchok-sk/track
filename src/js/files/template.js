const isJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

class TempalteConstrucor {
  constructor(templateButtons) {
    this.templateButtons = templateButtons;

    const places = {
      topRight: {
        id: "",
        value: false,
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
      center: {
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
      set: (target, argPlace, value) => {
        let place = argPlace.replace(/'/g, '"');
        let isBusy = false;

        if (isJSON(place)) {
          isBusy =
            this.places[place[0]].value || this.places[place[1]].value
              ? true
              : false;
          place = JSON.parse(argPlace);
        } else {
          isBusy = target[place].value;
        }

        const { id } = value;

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

          if (typeof place === "string") {
            target[place] = value;
          } else {
            target[place[0]] = value;
            target[place[1]] = value;
          }

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
      let valuePlace = btn.value.replace(/'/g, '"');
      const id = btn.dataset.templateToggle;

      if (isJSON(valuePlace)) {
        valuePlace = JSON.parse(valuePlace);
      }

      // если место уже занято
      let isDisabled = false;

      if (typeof valuePlace === "string") {
        // btn.checked === false -- нужен для того, чтобы не дизейблить текущую отмеченную кнопку
        isDisabled =
          this.places[valuePlace].value === true && btn.checked === false;
      } else {
        // тут проверка на то, что если хотя бы одно место в одной из сторон занято, тогда будет невозможно поместить элемент, занимающий 2 места
        isDisabled =
          ((this.places[valuePlace[0]].value === true &&
            this.places[valuePlace[0]].id !== id) ||
            (this.places[valuePlace[1]].value === true &&
              this.places[valuePlace[1]].id !== id)) &&
          btn.checked === false;
      }

      if (isDisabled) {
        btn.setAttribute("disabled", "");
        btn.checked = false;
      } else {
        btn.removeAttribute("disabled");
      }
    });
  }

  changePlace(item, argPlace) {
    if (!item) return;

    const place = argPlace.replace(/'/g, '"');

    if (!isJSON(place) && !this.places[place]) {
      return;
    } else if (isJSON(place)) {
      const [placeOne, placeTwo] = JSON.parse(place);

      if (!this.places[placeOne] || !this.places[placeTwo]) return;
    }

    item.classList.remove(
      "_top-right",
      "_top-left",
      "_bottom-left",
      "_bottom-right",
      "_center",
      "_left",
      "_right",
      "_bottom",
      "_top"
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

      case "center":
        this.setPlace(item, "center", "_center");
        break;

      case '["topLeft", "bottomLeft"]':
        this.setPlace(item, '["topLeft", "bottomLeft"]', "_left");
        break;

      case '["topRight", "bottomRight"]':
        this.setPlace(item, '["topRight", "bottomRight"]', "_right");
        break;

      case '["bottomLeft", "bottomRight"]':
        this.setPlace(item, '["bottomLeft", "bottomRight"]', "_bottom");
        break;

      case '["topLeft", "topRight"]':
        this.setPlace(item, '["topLeft", "topRight"]', "_top");
        break;

      default:
        break;
    }
  }

  setPlace(item, argPlace, className) {
    try {
      let place = argPlace.replace(/'/g, '"');
      let isBusy = false;

      if (isJSON(place)) {
        place = JSON.parse(place);

        // если элемент занимает 2 места и какая-то из сторон занята, тогда isBusy = true
        isBusy =
          (this.places[place[0]].value &&
            this.places[place[0]].id !== item.id) ||
          (this.places[place[1]].value && this.places[place[1]].id !== item.id)
            ? true
            : false;
      } else {
        this.places[place].value;
      }

      // если место занято, то кидаем ошибку и дизейблим input
      if (isBusy) {
        const currInputs = document.querySelectorAll(
          `[data-template-toggle="${item.id}"]`
        );

        const currInput = Array.from(currInputs).find(
          (input) => input.value === argPlace
        );

        currInput.checked = false;
        currInput.setAttribute("disabled", "");

        throw new Error("Место занято");
      }

      item.classList.add(className);
      this.places[argPlace] = {
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
