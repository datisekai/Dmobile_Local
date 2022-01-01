//Start header

window.onscroll = () =>{
    if(window.scrollY >= 300) {
        document.getElementById('header').style.backgroundColor = 'white'
        document.getElementById('header').style.boxShadow = '0px 0px 10px 0px #999'
    } else {
        document.getElementById('header').style.backgroundColor = 'transparent'
        document.getElementById('header').style.boxShadow = 'none'
    }
}

const backToHome = () => {
    window.location = 'index.html'
}

//End header


//Start Slider
const renderSlide = () => {
    const htmls = `<input type="radio" name="slide" id="slideOne" onclick="changeSlide(value)" value="0" checked>
    <input type="radio" name="slide" id="slideTwo" onclick="changeSlide(value)" value="1">
    <input type="radio" name="slide" id="slideThree" onclick="changeSlide(value)" value="2">
    <input type="radio" name="slide" id="slideFour" onclick="changeSlide(value)" value="3">`
    document.querySelector('.changeSlider').innerHTML = htmls
}

let indexSlide = 1
const listSlide = ['backgroundIphoneTrue.png','backgroudIphone.jpg','backgroundSamsung.jpg','backgroundOppo.jpeg']
const changeSlide = (value) => {
    document.getElementById('slider').style.backgroundImage = `url(./assets/img/${listSlide[value]})`
    switch(parseInt(value))
    {
        case 0:
            document.getElementById('slideOne').checked = true
            indexSlide++
            break
        case 1:
            document.getElementById('slideTwo').checked = true
            indexSlide++
            break
        case 2:
            document.getElementById('slideThree').checked = true
            indexSlide++
            break
        case 3:
            document.getElementById('slideFour').checked = true
            indexSlide = 0
            break
        default:
            document.getElementById('slideOne').checked = true
            break
    }
}

setInterval(() => {
    changeSlide(indexSlide)
},4000)
// End Slider

//Start introduce

const readMore = () => {
    document.getElementById('readmore').style.display = 'block'
    document.getElementById('btnReadMore').style.display = 'none'
}

//End introduce

// Start search

let indexDisplaySearch = 0
const displayInputSearch = () => {
    ++indexDisplaySearch
    switch(indexDisplaySearch%2)
    {
        case 0:
            document.getElementById('search').style.display = 'none'
            break
        case 1:
            document.getElementById('search').style.display = 'inline'
            break
    }
}

//End search


//Start init customers

let members = []

const initMembers = () => {
    if(localStorage.getItem('members') == null)
    {
        members = [
            {
                id:0,
                username:'admin',
                password:'admin',
                email: 'admin@gmail.com',
                level:0
            },
            {
                id:1,
                username:'datisekai',
                password:'bedatdz',
                email:'datisekai@gmail.com',
                level:1
            }
        ]
        localStorage.setItem('members', JSON.stringify(members))
    }else{
        members = JSON.parse(localStorage.getItem('members'))
    }
}

initMembers()
const customers = members.filter(member => member.level == 1)
const admins = members.filter(member => member.id == 0)

//End init customers

//Start Login

const displayFormLogin = () => {
    document.getElementById('formLogin').style.display = 'block'
    document.querySelector('.toolbars').style.display = 'none'
    hideForm()
}

const hideFormLogin = () => document.getElementById('formLogin').style.display = 'none'

const renderFormLogin = () => {
    const htmls = ` <div class="form__main-item">
    <label for="usernameLogin">Username</label>
    <input type="text" placeholder="Enter usename..." class="form-text" id="usernameLogin">
    <p class="errorUserLogin"></p>
</div>
<div class="form__main-item">
    <label for="passwordLogin">Password</label>
    <input type="password" placeholder="Enter password..." class="form-text" id="passwordLogin">
    <p class="errorPassLogin"></p>
</div>

<div class="form__main-item">
    <button class="login-btn" onclick="onLogin()">Login</button>
</div>
`

    const html = ` <p>Do not have an account? <span onclick="renderFormRegister()">Register</span></p>`

    document.querySelector('.form__main').innerHTML = htmls
    document.querySelector('.form__change').innerHTML = html
    document.querySelector('.form__heading h2').textContent = 'Login'
    handleLogin()
}

const isUserLogin = () => !checkEmpty(document.getElementById('usernameLogin').value) ? true : document.querySelector('.errorUserLogin').textContent = 'Không được bỏ trống'
const isPassLogin = () => !checkEmpty(document.getElementById('passwordLogin').value) ? true : document.querySelector('.errorPassLogin').textContent = 'Không được bỏ trống'

const checkUserLogin = () => {
    const inputUser = document.getElementById('usernameLogin')
    inputUser.onblur = () => isUserLogin()
    inputUser.oninput = () => document.querySelector('.errorUserLogin').textContent = ''
}

const checkPassLogin = () => {
    const inputPass = document.getElementById('passwordLogin')
    inputPass.onblur = () => isPassLogin()
    inputPass.oninput = () => document.querySelector('.errorPassLogin').textContent = ''
}

const handleLogin = () => {
    checkUserLogin()
    checkPassLogin()
}

renderFormLogin()

const onLogin = () => {
    const user = document.getElementById('usernameLogin').value
    const pass = document.getElementById('passwordLogin').value
    const check = members.filter(member => member.username.toUpperCase() == user.toUpperCase() && member.password.toUpperCase() == pass.toUpperCase())
    if(check.length != 0)
    {
        sessionStorage.setItem('sessionLogin',user)
        swal('Login successfull','You can buy product now','success')
        isLogin()
        hideFormLogin()
    }else{
        swal('Login failed','Username or password incorrect','error')
    }
}

const isLogin = () => {
    if(sessionStorage.getItem('sessionLogin') != null)
    {
        const name = sessionStorage.getItem('sessionLogin')
        const img = sessionStorage.getItem('imgLogin') || './assets/img/avt.jpg'
        const htmls = `  <div class="user__avatart">
        <img src="${img}" alt="">
        <span>${name}</span>
    </div>

    <div class="user__tool">
        <ul class="user__tool-list">
            <li class="user__tool-item" onclick="displayCart()">Cart</li>
            <li class="user__tool-item" onclick="displayOrder()">Order</li>
            <li class="user__tool-item" onclick="onLogout()" id="logout">Logout</li>
        </ul>
    </div>`
        document.querySelector('.header__navbar-tool-login').style.display = 'none'
        document.getElementById('mobileLogin').style.display = 'none'
        document.getElementById('mobileLoginSocial').style.display = 'none'
        document.querySelector('.header__navbar-tool-has-login').innerHTML = htmls
        document.querySelector('.header__navbar-tool-login-social').style.display = 'none'
        renderCart()
        return true
    }
}

const hideForm = () => {
    if(document.querySelector('.errorUserLogin') != null)
    {   
        document.querySelector('.errorUserLogin').textContent = ''
        document.querySelector('.errorPassLogin').textContent = ''
    }
    if(document.querySelector('.errorUserRegister') != null)
    {
        document.querySelector('.errorUserRegister').textContent = ''
        document.querySelector('.errorPassRegister').textContent = ''
        document.querySelector('.errorEmail').textContent = ''
    }
}

//End Login

//Start Register

const renderFormRegister = () => {
    const htmls = `<div class="form__main-item">
    <label for="usernameRegister">Username</label>
    <input type="text" placeholder="Enter usename..." class="form-text" id="usernameRegister">
    <p class="errorUserRegister"></p>
</div>
<div class="form__main-item">
    <label for="passwordRegister">Password</label>
    <input type="password" placeholder="Enter password..." class="form-text" id="passwordRegister">
    <p class="errorPassRegister"></p>
</div>

<div class="form__main-item">
    <label for="emailRegister">Email</label>
    <input type="email" placeholder="Enter email..." class="form-text" id="emailRegister">
    <p class="errorEmail"></p>
</div>

<div class="form__main-item">
    <button class="register-btn" id="actionRegister" onclick="onRegister()">Register</button>
</div>`
    const html = ` <p>Do you already have an account? <span onclick="renderFormLogin()">Login</span></p>`

    document.querySelector('.form__main').innerHTML = htmls
    document.querySelector('.form__change').innerHTML = html
    document.querySelector('.form__heading h2').textContent = 'Register'
    handleRegister()
}

const checkEmpty = (value) => value == '' ? true : false


const checkChar = (value) => value.length < 5 ? true : false


const checkAvailable = (value) => {
    const check = members.filter(member => member.username.toUpperCase() === value.toUpperCase())
    return check.length != 0 ? true : false 
}

const checkUserRegister = () => {
    const inputUser = document.getElementById('usernameRegister')
    inputUser.onblur = () => isUser() 
    inputUser.oninput = () => document.querySelector('.errorUserRegister').textContent = ''
}

const isUser = () => {
    const inputUser = document.getElementById('usernameRegister')
    if(!checkEmpty(inputUser.value))
    {
        if(!checkChar(inputUser.value))
        {
            return !checkAvailable(inputUser.value) ? true : document.querySelector('.errorUserRegister').textContent = 'Username already exist' && inputUser.classList.add('errorInput')
        } else {
            document.querySelector('.errorUserRegister').textContent = 'Username must be more than 5 charactets'
        }
    } else {
        document.querySelector('.errorUserRegister').textContent = 'Not be empty'
    }
}

const checkPasswordRegister = () => {
    const inputPass = document.getElementById('passwordRegister')
    inputPass.onblur = () => isPassword()
    inputPass.oninput = () => document.querySelector('.errorPassRegister').textContent = ''
}

const isPassword = () => {
    const inputPass = document.getElementById('passwordRegister')
    if(!checkEmpty(inputPass.value))
        {
            return !checkChar(inputPass.value) ? true : document.querySelector('.errorPassRegister').textContent = 'Password must be more than 5 charactets'
        } else {
            document.querySelector('.errorPassRegister').textContent = 'Not be empty'
        }
}

const checkEmail = () => {
    const inputEmail  = document.getElementById('emailRegister')
    inputEmail.onblur = () => isEmail()
    inputEmail.oninput = () => document.querySelector('.errorEmail').textContent = ''
}

const isEmail = () => {
    const inputEmail  = document.getElementById('emailRegister')
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!checkEmpty(inputEmail.value))
        {
            return regex.test(inputEmail.value) ? true : document.querySelector('.errorEmail').textContent = 'This field must be email'
        } else {
            document.querySelector('.errorEmail').textContent = 'Not be empty'
        }
}


const handleRegister = () => {
    checkUserRegister()
    checkPasswordRegister()
    checkEmail()
}

const onRegister = () => {
      if(isEmail() && isPassword() && isUser())
      {
          const username = document.getElementById('usernameRegister').value
          const password = document.getElementById('passwordRegister').value
          const email = document.getElementById('emailRegister').value
          members.push({
              id:members.length,
              username:username,
              password:password,
              email:email,
              level:1
          })
          
          localStorage.setItem('members',JSON.stringify(members))
          swal('Register successfull','You can login now','success')
          renderFormLogin()
      } else {
          swal('Register failed','Please enter full infomation','error')
      }
}



//End Register


//Start logout

const onLogout = () => {
    swal({
        title: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          sessionStorage.removeItem("sessionLogin");
          sessionStorage.removeItem("imgLogin");
          window.location = "index.html";
        }
      });
}

//end logout

//Start toolbars

const displayToolBars = () => document.querySelector('.toolbars').style.display = 'block'
const hideToolBars = () => document.querySelector('.toolbars').style.display = 'none'

//End toolbars

//Start Cart

let carts = []
const initCart = () => {
    const sessionLogin = sessionStorage.getItem('sessionLogin') || null
    if(sessionLogin != null)
    {
        if(localStorage.getItem(`${sessionLogin}Cart`) == null)
        {
            carts = []
            localStorage.setItem(`${sessionLogin}Cart`,JSON.stringify(carts))
        }else{
            carts = JSON.parse(localStorage.getItem(`${sessionLogin}Cart`))
        }
    }
}

const plusCart = (id) => {
    carts = carts.map(product => {
        if(product.id == id)
        {
            ++product.quantify
        }
        return product
    })
    localStorage.setItem(`${sessionStorage.getItem('sessionLogin')}Cart`,JSON.stringify(carts))
    renderCart()
}

const minusCart = (id) => {
    carts = carts.map(product => {
        if(product.id == id)
        {
            if(product.quantify > 1)
            {
                --product.quantify
            }
        }
        return product
    })
    localStorage.setItem(`${sessionStorage.getItem('sessionLogin')}Cart`,JSON.stringify(carts))
    renderCart()
}

const deleteCart = (id) => {
    swal({
        title: "Bạn có chắc muốn xóa?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
            for(var index in carts)
            {
                if(carts[index].id == id)
                {
                    carts.splice(index,1)
                    break
                }
            }
            localStorage.setItem(`${sessionStorage.getItem('sessionLogin')}Cart`,JSON.stringify(carts))
            renderCart()
        }
      });
    
}

const hideErrorCart = () => {
    document.querySelector('.errorAddress').textContent = ''
    document.querySelector('.errorPhone').textContent = ''
}

const renderCart = () => {
    const cartsPrices = carts.map(product => product.prices * product.quantify)
    const total = cartsPrices.reduce((pre,cur) => pre + cur , 0)
    const htmls = carts.map(product => {
        return `<div class="cart__content-product">
        <div class="cart__content-product-img">
            <img src="./assets/img/${product.img}" alt="">
        </div>

        <div class="cart__content-product-name">
            <p>${product.type}</p>
            <h2>${product.name}</h2>
        </div>

        <div class="cart__content-product-quantify">
            <i class="fas fa-plus" onclick="plusCart(${product.id})"></i>
            <span>${product.quantify}</span>
            <i class="fas fa-minus" onclick="minusCart(${product.id})"></i>
        </div>

        <div class="cart__content-product-prices">
            <h2><i class="fas fa-dollar-sign"></i>${product.prices}</h2>
        </div>

        <div class="cart__content-product-tool">
            <i class="fas fa-backspace" onclick="deleteCart(${product.id})"></i>
        </div>
    </div>`
    })

    const totalSummary =  ` <div class="total-product">
    <h2>Total prices</h2>
    <h3><i class="fas fa-dollar-sign"></i>${total}</h3>
</div>

<div class="cart__content-checkout">
    <button onclick="onCheckOut()">Check out</button>
</div>`
    document.getElementById('lengthCart').textContent = `${carts.length} items`
    if(carts.length != 0)
    {
        document.getElementById('locationCart').innerHTML = htmls.join('')
    } else {
        document.getElementById('locationCart').innerHTML = '<p class="errorCart">No products yet</p>'
    }
    document.getElementById('totalSummary').innerHTML = totalSummary
    handleInfo()
}

initCart()

const displayCart = () => {
    document.querySelector('.cart').style.display = 'block'
    hideErrorCart()
} 
const hideCart = () => document.querySelector('.cart').style.display = 'none'

const addCart = (id) => {
    if(isLogin())
    {
        swal({
            title: "Bạn có chắc muốn thêm vào giỏ hàng?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
                const productCart = (products.filter(product => product.id == id))[0] || {};
                const oldCart = carts.length != 0 ? (carts.filter(cart => cart.id == id)) : []
                const newQuantify = oldCart.length != 0 ? oldCart[0].quantify + 1 : 1
                if(newQuantify != 1)
                {
                    for(var index in carts)
                    {
                        if(carts[index].id == id)
                        {
                           carts[index].quantify = newQuantify
                           break
                        }
                    }
                }else{
                    const newProduct = {
                        ...productCart,
                        quantify: newQuantify
                    }
                    carts.push(newProduct)
                }
                swal('Thêm vào giỏ thành công','','success')
                localStorage.setItem(`${sessionStorage.getItem('sessionLogin')}Cart`,JSON.stringify(carts))
                hideProductDetail()
                renderCart()
            }
          });
    }else{
        hideProductDetail()
        displayFormLogin()
    }
}

const isAddress = () => !checkEmpty(document.getElementById('address').value) ? true : document.querySelector('.errorAddress').textContent = 'Not be empty'
const isPhoneNumber = () => {
    const inputPhone = document.getElementById('phonenumber')
    const regex = /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}/
    if(!checkEmpty(inputPhone.value))
        {
            return regex.test(inputPhone.value) ? true : document.querySelector('.errorPhone').textContent = 'This field must be a phone number'
        } else {
            document.querySelector('.errorPhone').textContent = 'Not be empty'
        }
}
const checkAddress = () => {
    const inputAddress = document.getElementById('address')
    inputAddress.onblur = () => isAddress()
    inputAddress.oninput = () => document.querySelector('.errorAddress').textContent = ''
}

const checkPhone = () => {
    const inputPhone = document.getElementById('phonenumber')
    inputPhone.onblur = () => isPhoneNumber()
    inputPhone.oninput = () => document.querySelector('.errorPhone').textContent = ''
}

const handleInfo = () => {
    checkAddress()
    checkPhone()
}

const onCheckOut = () => {
    if(isAddress() == true && isPhoneNumber() == true)
    {
        swal({
            title: "Are you sure you want to pay?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
                const date = new Date()
                const current = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                const address = document.getElementById('address').value
                const phoneNumber = document.getElementById('phonenumber').value
                const cartsPrices = carts.map(product => product.prices * product.quantify)
                const total = cartsPrices.reduce((pre,cur) => pre + cur , 0)
                const order = {
                    id:uuid(),
                    products:carts,
                    total: total,
                    date: current,
                    address: address,
                    phone: phoneNumber,
                    status: 'processing',
                    user: sessionStorage.getItem('sessionLogin')
                }
                orders.push(order)
                localStorage.setItem('orders',JSON.stringify(orders))
                carts = []
                localStorage.setItem(`${sessionStorage.getItem('sessionLogin')}Cart`,JSON.stringify(carts))
                swal('Checkout successfull','Please prepare the money to receive the goods','success')
                hideCart()
                renderCart()
                renderOrders()
          });
    }else{
        swal('Checkout Failed','Please enter full infomation','error')
    }
}

//End Cart


//UUID
function uuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);  
    return uuid.substr(uuid.lastIndexOf('/') + 1);
}
//UUID

//Start Order

let orders =  []

const initOrders = () => {
    if(localStorage.getItem('orders') == null)
    {
        localStorage.setItem('orders',JSON.stringify(orders))
    }else {
        orders = JSON.parse(localStorage.getItem('orders'))
    }
}

initOrders()

const displayOrder = () => document.querySelector('.order').style.display = 'block'
const hideOrder = () => document.querySelector('.order').style.display = 'none'

const renderOrders = () => {
    const myOrders = orders.filter(order => order.user == sessionStorage.getItem('sessionLogin'))
    const htmls = myOrders.map(order => {
        return `<div class="order__content-container-product-item">
        <div class="order__content-product-id" onclick="renderOrderDetail('${order.id}')">
            <h3>${order.id}</h3>
        </div>

        <div class="order__content-product-date">
            <h3>${order.date}</h3>
        </div>

        <div class="order__content-product-status">
            <h3>${order.status}</h3>
        </div>

        <div class="order__content-product-total">
            <h3><i class="fas fa-dollar-sign"></i>${order.total}</h3>
        </div>
    </div>`
    })

    document.getElementById('locationOrder').innerHTML = htmls.join('')
}

//End Order

//Start Order Detail

const displayOrderDetail = () => {
    document.querySelector('.order__detail').style.display = 'block'
}
const hideOrderDetail = () => document.querySelector('.order__detail').style.display = 'none'

const renderOrderDetail = (id) => {
    const details = (orders.filter(order => order.id == id))[0].products
    const htmls = details.map((detail) => {
        return `<div class="order__detail-product">
        <div class="order__detail-img">
            <img src="./assets/img/${detail.img}" alt="">
        </div>
        <div class="order__detail-name">
            <p>${detail.type}</p>
            <h3>${detail.name}</h3>
        </div>
        <div class="order__detail-quantify">
            <h3>${detail.quantify}</h3>
        </div>

        <div class="order__detail-prices">
            <h3><i class="fas fa-dollar-sign"></i>${detail.prices}</h3>
        </div>
    </div>`
    })

    document.getElementById('locationOrderDetail').innerHTML = htmls.join('')

    displayOrderDetail()
}

//End Order Detail

//Start Product Detail

const displayProductDetail = () => document.querySelector('.product__info').style.display = 'block'
const hideProductDetail = () => document.querySelector('.product__info').style.display = 'none'

const showProductDetailt = (id) => {
    const productDetailt = products.filter(product => product.id == id)
    const htmls = `<div class="product__info-content-main-img">
    <img src="./assets/img/${productDetailt[0].img}" alt="">
</div>

<div class="product__info-content-main-detail">
    <div class="product__info-content-main-detail-header">

        <h2 class="product__info-content-main-detail-heading">Infomation</h2>
    </div>

    <div class="product__info-content-main-detail-item">
        <h2><i class="fas fa-crown"></i>${productDetailt[0].type}</h2>
    </div>
    <div class="product__info-content-main-detail-item">
        <h2><i class="fas fa-mobile"></i>${productDetailt[0].name}</h2>
    </div>
    <div class="product__info-content-main-detail-item">
        <h2><i class="fas fa-coins"></i>${productDetailt[0].prices}$</h2>
    </div>

    <div class="product__info-add-cart">
        <button onclick="addCart(${productDetailt[0].id})">Add Cart</button>
    </div>
</div>`
    document.getElementById('locationProductDetail').innerHTML = htmls
    displayProductDetail()
}

//End Product Detail

//Start Get URL

function getURL(value) {
    const query = window.location.search.substring(1);
    const lets = query.split("&");
    for (let i = 0; i < lets.length; i++) {
      let pair = lets[i].split("=");
      if (decodeURIComponent(pair[0]) == value) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

//End Get URL

//Start Init Products

let products = []

const initProducts = () => {
    if(localStorage.getItem('products') == null)
    {
        products = [
            {
                id:1,
                name:'Iphone 13 ProMax',
                img:'ip1.jpg',
                prices:2000,
                type:'iphone'
            },
            {
                id:2,
                name:'OPPO RENO 6Z',
                img:'op1.jpg',
                prices:800,
                type:'oppo'
            },
            {
                id:3,
                name:'SAMSUNG GALAXY Z',
                img:'ss1.jpg',
                prices:2200,
                type:'samsung'
            },
            {
                id:4,
                name:'IPHONE 13 128GB',
                img:'ip3.jpg',
                prices:1500,
                type:'iphone'
            },
            {
                id:5,
                name:'SAMSUNG GALAXY Z',
                img:'ss2.jpg',
                prices:1900,
                type:'samsung'
            },
            {
                id:6,
                name:'OPPO A94',
                img:'op2.jpg',
                prices:900,
                type:'oppo'
            },
            {
                id:7,
                name:'OPPO RENO 5',
                img:'op3.jpg',
                prices:700,
                type:'oppo'
            },
            {
                id:8,
                name:'OPPO A12 32GB',
                img:'op4.jpg',
                prices:300,
                type:'oppo'
            },
            {
                id:9,
                name:'SAMSUNG GALAXY S21+',
                img:'ss3.jpg',
                prices:1800,
                type:'samsung'
            },
            {
                id:10,
                name:'SAMSUNG GALAXY S20',
                img:'ss4.png',
                prices:2200,
                type:'samsung'
            },
            {
                id:11,
                name:'SAMSUNG GALAXY Z',
                img:'ss5.jpg',
                prices:1200,
                type:'samsung'
            },
            {
                id:12,
                name:'SAMSUNG GALAXY M52',
                img:'ss6.jpg',
                prices:500,
                type:'samsung'
            },
            {
                id:13,
                name:'SAMSUNG GALAXY M31',
                img:'ss7.jpg',
                prices:600,
                type:'samsung'
            },
            {
                id:14,
                name:'IPHONE 11 128GB',
                img:'ip4.jpg',
                prices:1400,
                type:'iphone'
            },
            {
                id:15,
                name:'IPHONE 12 64GB',
                img:'ip3.jpg',
                prices:1600,
                type:'iphone'
            },
            {
                id:16,
                name:'IPHONE 12 MINI',
                img:'ip5.jpg',
                prices:1350,
                type:'iphone'
            },
            {
                id:17,
                name:'IPHONE 12 128GB BLUE',
                img:'ip6.jpg',
                prices:1950,
                type:'iphone'
            },
            {
                id:18,
                name:'IPHONE 12 128GB BLACK',
                img:'ip7.jpg',
                prices:1340,
                type:'iphone'
            },
            {
                id:19,
                name:'IPHONE 13 PROMAX',
                img:'ip8.jpg',
                prices:2700,
                type:'iphone'
            },
            {
                id:20,
                name:'IPHONE 11 64GB',
                img:'ip9.jpg',
                prices:750,
                type:'iphone'
            },
            {
                id:21,
                name:'IPHONE 13 PROMAX',
                img:'ip10.jpg',
                prices:1690,
                type:'iphone'
            },
            {
                id:22,
                name:'IPHONE 12 PRO',
                img:'ip11.jpg',
                prices:1480,
                type:'iphone'
            },
            {
                id:23,
                name:'IPHONE 11 PROMAX',
                img:'ip12.jpg',
                prices:1150,
                type:'iphone'
            },


        ]
        localStorage.setItem('products', JSON.stringify(products))
    }else{
        products = JSON.parse(localStorage.getItem('products'))
    }
}

initProducts()
const iphones = products.filter(product => product.type == 'iphone')
const samsungs = products.filter(product => product.type == 'samsung')
const oppos = products.filter(product => product.type == 'oppo')
//End Init Products

//Render Product 

// const renderProduct = (arrProduct)

const renderProduct = (products, heading) => {
    const page = parseInt(getURL('page')) || 1
    const start = (page - 1) * 8
    const finish = page * 8
    const productsRender = products.slice(start, finish)
    const htmls = productsRender.map(product => {
        return `<div class="col l-3 m-4 c-12">
        <div class="products__content-item">
            <div class="product__content-img">
                <img src="./assets/img/${product.img}" alt="">
            </div>

            <div class="product__content-prices">
                <p><i class="fas fa-dollar-sign"></i>${product.prices}</p>
            </div>

            <div class="product__content-name">
                <p>${product.name.toUpperCase()}</p>
            </div>

            <div class="product__content-tool">
                <div class="product__content-tool-info">
                    <button onclick="showProductDetailt(${product.id})">View Info</button>
                </div>

                <div class="product__content-tool-buy">
                    <button onclick="addCart(${product.id})">Add Cart</button>
                </div>
            </div>
        </div>
    </div>` 
    })
    document.querySelector('.product__heading').textContent = heading
    document.getElementById('locationRender').innerHTML = htmls.join('')
}

//End Render Product 

//Start Render Pagination

const renderPagination = (products) => {
    const pageNumber = products.length%8 == 0 ? Math.floor(products.length/8) : (Math.floor((products.length/8) + 1))
    let htmls = ''
    const type = getURL('type') || 'home'
    for(let i = 1;i<=pageNumber;i++)
    {
        htmls += `<a href="index.html?type=${type}&page=${i}#products">
        <li class="pagination__list-item">${i}</li>
    </a>`
    }
    if(pageNumber >= 2){
        document.querySelector('.pagination__list').innerHTML = htmls 
    }
    
}

//End Render Pagination

//Load
window.onload = () => {
    switch(getURL('type') || '')
    {
        case '':
            renderProduct(products,'HOT SELLING PRODUCT')
            renderPagination(products)
            break
        case 'iphone':
            renderProduct(iphones,getURL('type'))
            renderPagination(iphones)
            document.getElementById('productType').value = 'iphone'
            break
        case 'samsung':
            renderProduct(samsungs,getURL('type'))
            renderPagination(samsungs)
            document.getElementById('productType').value = 'samsung'
            break
        case 'oppo':
            renderProduct(oppos,getURL('type'))
            renderPagination(oppos)
            document.getElementById('productType').value = 'oppo'
            break
        case 'search':
            renderProduct(searchs,'search result')
            renderPagination(searchs)
            window.location = 'index.html?type=search#products'
            break
        default:
            renderProduct(products,'HOT SELLING PRODUCT')
            renderPagination(products)
            break
    }
    renderSlide()
    renderFormLogin()
    renderOrders()
    isLogin()
}
//Load

//Start Handle Search

let searchs = JSON.parse(localStorage.getItem('searchs')) || []

const handleSearch = () => {
    const priceProduct = document.getElementById('productPrices').value
    const typeProduct = document.getElementById('productType').value
    const nameProduct = document.getElementById('txtsearch').value
    const productRankOne = products.filter(product => product.prices < 1000)
    const productRankTwo = products.filter(product => product.prices >= 1000 && product.prices < 2000) 
    const productRankThree = products.filter(product => product.prices > 2000)
    if(typeProduct != '')
    {
        if(priceProduct != '')
        {
            if(priceProduct == 'rankOne')
            {
                searchs = nameProduct != '' ? productRankOne.filter(product => product.type == typeProduct && product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : productRankOne.filter(product => product.type == typeProduct)
            } else if(priceProduct == 'rankTwo')
            {
                searchs = nameProduct != '' ? productRankTwo.filter(product => product.type == typeProduct && product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : productRankTwo.filter(product => product.type == typeProduct)
            } else if(priceProduct == 'rankThree')
            {
                searchs = nameProduct != '' ? productRankThree.filter(product => product.type == typeProduct && product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : productRankThree.filter(product => product.type == typeProduct)
            }
        } else {
            searchs = nameProduct != '' ? products.filter(product => product.type == typeProduct && product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : products.filter(product => product.type == typeProduct)
        }
    }else {
        if(priceProduct != '')
        {
            if(priceProduct == 'rankOne')
            {
                searchs = nameProduct != '' ? productRankOne.filter(product => product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : productRankOne
            } else if(priceProduct == 'rankTwo')
            {
                searchs = nameProduct != '' ? productRankTwo.filter(product => product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : productRankTwo
            } else if(priceProduct == 'rankThree')
            {
                searchs = nameProduct != '' ? productRankThree.filter(product => product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : productRankThree
            }
        } else {
            searchs = nameProduct != '' ? products.filter(product => product.name.toUpperCase().search(nameProduct.toUpperCase()) != -1) : products
        }
    }
    localStorage.setItem('searchs',JSON.stringify(searchs))
    window.location = 'index.html?type=search'
}
//End Handle Search

//Login social
const displayLoginSocial = () => document.querySelector('.login__social').style.display = 'block'
const hideLoginSocial = () => document.querySelector('.login__social').style.display = 'none'

//end login social

//Change type module

document.querySelector('.header__navbar-logo').onclick = () => backToHome()
document.querySelector('.header__navbar-tool-login').onclick = () => displayFormLogin()
document.getElementById('toolBars').onclick = () => displayToolBars()
document.querySelector('.search-btn').onclick = () => handleSearch()
document.getElementById('isearch').onclick = () => displayInputSearch()
document.getElementById('btnReadMore').onclick = () => readMore()
document.querySelector('.form__overlay').onclick = () => hideFormLogin()
document.querySelector('.form__close').onclick = () => hideFormLogin()
if(document.getElementById('.form__change p span') != null)
{
    document.getElementById('.form__change p span').onclick = () => renderFormRegister()
}
document.querySelector('.cart_content-product-shop-footer').onclick = () => hideCart()
document.querySelector('.order__content-footer').onclick = () => hideOrder()
document.querySelector('.order__detail-close').onclick = () => hideOrderDetail()
document.querySelector('.product__info-back').onclick = () => hideProductDetail()
document.getElementById('mobileLogin').onclick = () => displayFormLogin()
document.querySelector('.toolbars__close').onclick = () => hideToolBars() 
document.querySelector('.header__navbar-tool-login-social').onclick = () => displayLoginSocial()
document.querySelector('.login__social-close').onclick = () => hideLoginSocial()
document.getElementById('mobileLoginSocial').onclick = () => displayLoginSocial()
//Dom Event html 

//Authen 
