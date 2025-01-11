class Calculator {
  constructor() {
    this.result = document.querySelector(".result");
    this.flagEvenly = false;
    this.flagPlusMinus = true;
    this.num2 = null;
    this.num1 = null;
    this.operator = null;
    this.itog = null;
    this.rendering();
  }

  // функция нажатия кнопок и их выполнения
  rendering() {
    document.addEventListener("click", (e) => {
      // числа
      if (e.target.classList.contains("Number")) {
        if (document.querySelector(".active")) {
          document.querySelector(".active").classList.remove("active");
        }

        // При нажатии на цифру, если есть уже ответ и не был нажат оператор - стирает данные
        if (this.flagEvenly) {
          this.restart();
          this.flagEvenly = false;
        }

        // Добавляем отображение нажатых цифр
        const num = e.target.innerHTML;

        if (this.num1 == null) {
          this.num1 = num;
        } else {
          this.num1 += num;
        }
        this.result.innerHTML = this.num1;
      }

      // Оператор плюс
      if (e.target.classList.contains("Plus")) {
        this.removeActiveBtn();
        e.target.classList.add("active");
        this.calculations();
        this.operator = "+";
      }

      if (e.target.classList.contains("Minus")) {
        this.removeActiveBtn();
        e.target.classList.add("active");
        this.calculations();
        this.operator = "-";
      }

      if (e.target.classList.contains("Times")) {
        this.removeActiveBtn();
        e.target.classList.add("active");
        this.calculations();
        this.operator = "*";
      }

      if (e.target.classList.contains("buttonision")) {
        this.removeActiveBtn();
        e.target.classList.add("active");
        this.calculations();
        this.operator = "/";
      }

      // знак дроби (точка)
      if (e.target.classList.contains("Point")) {
        if (!this.num1.includes(".")) {
          this.num1 += ".";
          this.result.innerHTML = this.num1;
        }
      }

      if (e.target.classList.contains("AC")) {
        this.restart();
      }

      if (e.target.classList.contains("Plus-Minus")) {
        if (this.flagPlusMinus) {
          this.result.innerHTML = -Math.abs(this.result.innerHTML);
          this.num2 = -Math.abs(this.num2);
          this.num1 = -Math.abs(this.num1);
          this.itog = -Math.abs(this.itog);
          this.flagPlusMinus = false;
        } else {
          this.result.innerHTML = +Math.abs(this.result.innerHTML);
          this.num2 = +Math.abs(this.num2);
          this.num1 = +Math.abs(this.num1);
          this.itog = +Math.abs(this.itog);
          this.flagPlusMinus = true;
        }
      }

      if (e.target.classList.contains("Percent")) {
        if (this.operator !== null) {
          let percent = this.num2 * (this.num1 / 100);
          this.itog = `${this.num2} ${this.operator} ${percent}`;
          this.itog = eval(this.itog);
          this.num1 = percent;
          this.num2 = this.itog;
        }

        if (this.operator == null || this.flagEvenly) {
          this.itog = eval(+this.result.innerHTML / 100);
          this.num1 = this.itog;
          this.operator = null;
        }

        this.flagEvenly = true;
        this.result.innerHTML = this.itog;
      }

      // при повторном нажатии не правильно работает

      if (e.target.classList.contains("Evenly")) {
          this.flagEvenly = true;
          this.counting();
          if(this.itog !== null){
          this.result.innerHTML = this.itog;
          this.num2 = this.itog; 
          }  
      }
    });
  }

  removeActiveBtn() {
    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove("active");
    }
  }
  calculations() {
    if (this.operator == null) {
      this.num2 = this.num1;
      this.num1 = null;
    }

    if ((this.operator !== null) & (this.num1 !== null)) {
      if (!this.flagEvenly) {
        this.counting();
        this.result.innerHTML = this.itog;
      }
      this.num2 = this.itog;
      this.num1 = null;
    }
    this.flagEvenly = false;
  }

  counting() {
    switch (this.operator) {
      case "+":
        this.itog = eval(+this.num2 + +this.num1);
        break;
      case "-":
        this.itog = eval(+this.num2 - +this.num1);
        break;
      case "*":
        this.itog = eval(+this.num2 * +this.num1);
        break;
      case "/":
        this.itog = eval(+this.num2 / +this.num1);
        break;
    }
  }

  restart() {
    this.result.innerHTML = "0";
    this.num2 = null;
    this.num1 = null;
    this.operator = null;
    this.itog = null;
  }
}

const commentBlog = new Calculator();
