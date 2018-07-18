
// Push Notification Start Here


// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu");
// messaging.requestPermission()
//     .then(function () {
//         console.log('Notification permission granted.');
//         return messaging.getToken()
//     })
//     .then(function (token) {
//         console.log(token);
//     })
//     .catch(function (err) {
//         console.log('Unable to get permission to notify.', err);
//     });

// Push Notification End Here



// sign Up And Login Work Start From Here
$(window).on('load', function () {
    $('#myModal').modal('show');
});
// $('#modal_id').modal({ backdrop: 'static', keyboard: 'false', show: 'true' });

var db = firebase.database();

var fullNameReff = document.getElementById('fullName');
var signUpEmailRef = document.getElementById('email');
var signUpReEmailRef = document.getElementById('re-email');
var signUpPasswordRef = document.getElementById('password')
var signUpRePasswordRef = document.getElementById('re-password');

function creatAccount() {
    console.log('Function Fired');
    var fullNameValue = fullNameReff.value;
    var emailValue = signUpEmailRef.value;
    // var reEmailValue = signUpReEmailRef.value;
    var passwordlValue = signUpPasswordRef.value;
    var rePasswordValue = signUpRePasswordRef.value;
    // swal({
    //     title: "Hello!",
    //     text: "Your Request Going To Done.",
    //     timer: 4000
    // });
    if (passwordlValue === rePasswordValue && fullNameValue !== "") {
        firebase.auth().createUserWithEmailAndPassword(signUpEmailRef.value, signUpPasswordRef.value)
            .then((success) => {
                var userDataObj = {
                    Email: emailValue,
                    Name: fullNameValue
                }
                var currentuseruid = firebase.auth().currentUser.uid;
                console.log(currentuseruid)
                db.ref('/UsersData/' + currentuseruid + '/').push(userDataObj);
                console.log('Sign Up Successfully', success);
                swal({
                    type: 'success',
                    title: 'Successfully Sign Up...',
                })
                window.location = "./logIn.html";
            })
            .catch((error) => {
                console.error('Sign Up User Failed', error);
                console.log(Object.values(error)[1])
                var err = Object.values(error)[1];
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
    }
    else {
        swal({
            type: 'error',
            title: 'Oops...',
            text: "Password Unmatched",
        })
    }
}

// Sign Up Work End Here

// Sign In Work Start From Here

var logInEmailRef = document.getElementById('emailLogin');
var logInPasswordRef = document.getElementById('passwordLogin');
var checkingBox = document.getElementById('checking');
function submit() {
    console.log('Function Fired');
    if (checkingBox.checked) {
        firebase.auth().signInWithEmailAndPassword(logInEmailRef.value, logInPasswordRef.value)
            .then(function (success) {
                console.log('Sign In Successfully', success);
                swal({
                    type: 'success',
                    title: 'Successfully Log In...',
                })
                var currentuseruid = firebase.auth().currentUser.uid;
                console.log(currentuseruid)
                localStorage.setItem('currentUID', currentuseruid);
                window.location = "./index.html"
                // window.history.back();
            })
            .catch(function (error) {
                console.error('Sign In User Failed', error);
                var err = Object.values(error)[1];
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
    }
    else {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please Check The CheckBox',
        })
    }
}

// Sign In Work End Here

// logout work start from here
if (localStorage.getItem('currentUID') === null) {
    document.getElementById('log-Out').style.visibility = 'hidden';
}
else {
    document.getElementById('log-Out').style.visibility = 'visible';
}

function logOut() {
    localStorage.removeItem('ChatUserUID');
    localStorage.removeItem('Detail Path');
    localStorage.removeItem('Token');
    localStorage.removeItem('currentUID');
    localStorage.removeItem('currentUserUID');
    localStorage.removeItem('selectedCategory');
    window.location = "../pages/login.html"
}

// logout work end here

// Submit an Ad Work start From HEre


var imageUrl;
function previewFile() {
    var file = document.querySelector('input[type=file]').files[0];
    console.log(file)
    var reader = new FileReader();
    console.log(reader)

    reader.addEventListener("load", function () {
        imageUrl = reader.result;
        console.log(imageUrl, "imageUrl")
        document.getElementById('file-Name').innerHTML = "File Uploaded"
    }, false);

    if (file) {
        var fileReader = reader.readAsDataURL(file);
    }
}
// console.log(imageUrl);
var adTitleRef = document.getElementById('ad-Title');
var adDescriptionRef = document.getElementById('ad-Description');
var adCategoryRef = document.getElementById('ad-category');
var adModelRef = document.getElementById('ad-Model');
var adYearRef = document.getElementById('ad-Year');
var adPrizeRef = document.getElementById('ad-Prize');
function submitAd() {
    var currentuserUid = localStorage.getItem('currentUID');
    console.log(currentuserUid)
    if (currentuserUid === null) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'First You Log In Our Website..'
        },
            function () {
                window.location.href = '..pages/logIn.html';
            })
    }
    else {
        adTitleRefVal = adTitleRef.value;
        adDescriptionRefVal = adDescriptionRef.value;
        var adSelectedCategoryVal = adCategoryRef.options[adCategoryRef.selectedIndex].text
        adModelRefVal = adModelRef.value;
        adYearRefVal = adYearRef.value;
        adPrizeRefVal = adPrizeRef.value;
        console.log(adTitleRefVal, 'adTitleRefVal');
        console.log(adDescriptionRefVal, 'adDescriptionRefVal');
        console.log(adSelectedCategoryVal, 'adSelectedCategoryVal');
        console.log(adModelRefVal, 'adModelRefVal');
        console.log(adYearRefVal, 'adYearRefVal');
        if (adTitleRefVal === '' || adTitleRefVal === ' ' ||
            adDescriptionRefVal === '' || adDescriptionRefVal === ' ' ||
            imageUrl === undefined ||
            adSelectedCategoryVal === "Select Category" ||
            adModelRefVal === '' || adModelRefVal === ' ' ||
            adYearRefVal === '' || adYearRefVal === ' ' ||
            adPrizeRefVal === '' || adPrizeRefVal === ' '
        ) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please Fill Blank Input Field..',
            })
        }
        else {
            var adObj = {
                UserUID: currentuserUid,
                Title: adTitleRefVal,
                Description: adDescriptionRefVal,
                ImageURL: imageUrl,
                Category: adSelectedCategoryVal,
                Model: adModelRefVal,
                Year: adYearRefVal,
                Prize: adPrizeRefVal
            }
            console.log(adObj);
            db.ref('/Ads/' + adSelectedCategoryVal + '/').push(adObj);
            swal({
                type: 'success',
                title: 'Ad Successfully Submit...',
                timer: 4000,
                showConfirmButton: false,
            },
                function () {
                    window.location.href = './index.html';
                })
        }
    }
}

// Submit an Ad Work End HEre


// Fetching Datas Work start From Here

var fetchingDivs = document.getElementById('fetchingDiv');
function fetchingData() {
    console.log('fire')
    db.ref('/Ads/').on('child_added', (snapshot) => {
        for (var key in snapshot.val()) {
            var objKey = key;
            console.log(objKey);
            var allPost = snapshot.val()[key];
            console.log(allPost);
            autoCallFunc(objKey, allPost);
        }
    })
}

// My post work start from here

function fetchMyPost() {
    var currentuseruid = localStorage.getItem('currentUID');
    if (currentuseruid === null) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'First You Log In Our Website..'
        },
            function () {
                window.location.href = '../pages/logIn.html';
            })
    }
    else {
        db.ref('/Ads/').on('child_added', (snapshot) => {
            for (var key in snapshot.val()) {
                var myPostobjKey = key;
                // console.log(key);
                var myPostObj = snapshot.val()[key];
                // console.log(myPostObj)
                var myUID = myPostObj.UserUID;
                if (currentuseruid === myUID) {
                    console.log(myPostObj)
                    autoCallFunc(myPostobjKey, myPostObj);

                }
            }
        })
    }
}

// my post work end here

var favArray = [];
function autoCallFunc(snapKey, snapUseruid) {
    var fetchUserObj = snapUseruid;
    console.log(fetchUserObj);

    var favoritePath = snapKey;
    console.log(favoritePath);
    // console.log(fetchUserObj.Title, "title");
    // console.log(fetchUserObj.Description, "Description");
    // console.log(fetchUserObj.Category, "Category");
    // console.log(fetchUserObj.ImageURL, "ImageURL");
    // console.log(fetchUserObj.Year, "Year");
    var cardDivs = document.createElement('div');
    cardDivs.setAttribute('id', 'cardDiv');
    cardDivs.setAttribute('class', 'card');
    cardDivs.setAttribute('class', 'col-md-4');
    var imgBoxs = document.createElement('img');
    imgBoxs.setAttribute('id', 'imgBox');
    imgBoxs.setAttribute('class', 'card-img-top')
    imgBoxs.src = fetchUserObj.ImageURL;
    var titleDivs = document.createElement('div');
    titleDivs.setAttribute('id', favoritePath);
    titleDivs.setAttribute('class', 'card-img-top titleDiv');
    var headTitle = document.createElement('h4');
    headTitle.setAttribute('id', 'head5');
    headTitle.innerHTML = fetchUserObj.Title;
    var paraModels = document.createElement('p')
    paraModels.setAttribute('id', 'paraModel')
    paraModels.innerHTML = fetchUserObj.Model;
    var spanText = document.createElement('span');
    var createText = document.createTextNode('Rs:');
    spanText.appendChild(createText);
    var prizeSpan = document.createElement('span');
    prizeSpan.innerHTML = fetchUserObj.Prize;
    var lineBreak = document.createElement('br');
    var iconSpan = document.createElement('span');
    iconSpan.style.fontSize = '50px';
    iconSpan.style.color = 'black';
    iconSpan.setAttribute('class', 'spanClass');
    var currentuseruid = localStorage.getItem('currentUID');
    (function el() {
        db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
            var favkey = snapObj.key;
            console.log(favkey);
            if (favkey === favoritePath) {
                // console.log(favkey);
                iconSpan.style.color = 'red';
                db.ref('/Ads/').on('child_added', (snapshot) => {
                    for (var key in snapshot.val()) {
                        if (key === favkey) {
                            var favObj = snapshot.val()[key];
                            console.log(favObj)
                            favArray.push(favObj)
                            localStorage.setItem('Favorite Array', JSON.stringify(favArray));
                        }
                    }
                })
            }
        })
    })()

    iconSpan.setAttribute('class', 'glyphicon glyphicon-heart-empty');
    iconSpan.onclick = function (ev) {
        if (currentuseruid === null) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'First You Log In Our Website..'
            },
                function () {
                    window.location.href = '../pages/logIn.html';
                })
        }
        else {
            if (currentuseruid === fetchUserObj.UserUID) {
                swal({
                    type: 'error',
                    title: 'Oops Its Your Own Post...',
                    timer: 2000,
                    showConfirmButton: false,
                })
            }

            else {
                alert('fire');
                var getPath = ev.path[1].id;
                console.log(getPath);
                if (iconSpan.style.color !== 'red') {
                    console.log('1st condi');
                    iconSpan.style.color = 'red';
                    db.ref('/Favorite/' + currentuseruid + '/' + getPath + '/').push('true');
                }
                else if (iconSpan.style.color === 'red') {
                    console.log('2nd condi');
                    iconSpan.style.color = 'black';
                    db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                        var favObj = snapObj.val();
                        console.log(favObj);
                        db.ref('/Favorite/' + currentuseruid + '/' + getPath + '/').remove()
                    })
                }
            }
        }
    }

    var moreBtn = document.createElement('button');
    moreBtn.setAttribute('class', 'btn btn-md btn-success butn');
    var moreBtnText = document.createTextNode('Details')
    moreBtn.appendChild(moreBtnText);

    moreBtn.onclick = function (ev) {
        var getPath = ev.path[1].id;
        localStorage.setItem('Detail Path', getPath);
        window.location = '../pages/detail.html';
    }
    cardDivs.appendChild(imgBoxs);
    cardDivs.appendChild(titleDivs);
    titleDivs.appendChild(headTitle);
    titleDivs.appendChild(paraModels);
    titleDivs.appendChild(spanText);
    titleDivs.appendChild(prizeSpan);
    titleDivs.appendChild(lineBreak);
    titleDivs.appendChild(iconSpan);
    // titleDivs.appendChild(lineBreak);    
    titleDivs.appendChild(moreBtn);
    cardDivs.appendChild(titleDivs);
    fetchingDivs.appendChild(cardDivs);
}


// Fetching Datas Work End HEre

// Search Category Vice Work Start From Here

var fetchDiv = document.getElementById('fetchingDiv');
var searchFetchiDiv = document.getElementById('searchFetchiDiv');
var selectCategoryRef = document.getElementById('Category-page-search');
function searchCategory() {
    var selectCategoryRefVal = selectCategoryRef.options[selectCategoryRef.selectedIndex].text
    console.log(selectCategoryRefVal);
    if (selectCategoryRefVal === 'Select Category') {
        swal({
            type: 'error',
            title: 'Oops...',
            text: "You're Not Selected Any Option...",
        })
    }
    else {
        localStorage.setItem('selectedCategory', selectCategoryRefVal);
        if (selectCategoryRefVal === 'Mobile') {
            window.location = '../pages/mobile.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Electronics And Home Appliances') {
            window.location = '../pages/electronic.html';
            fetchData();
        } else if (selectCategoryRefVal === 'Vehicles') {
            window.location = '../pages/vehicle.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Bike') {
            window.location = '../pages/bike.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Property For Sale') {
            window.location = '../pages/sale-property.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Property For Rent') {
            window.location = '../pages/rent-property.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Jobs') {
            window.location = '../pages/job.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Services') {
            window.location = '../pages/service.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Business Industrial & Agriculture') {
            window.location = '../pages/business.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Furniture & Home Decor') {
            window.location = '../pages/furniture.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Animals') {
            window.location = '../pages/animal.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Books, Sports & Hobbies') {
            window.location = '../pages/book.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Fashion & Beauty') {
            window.location = '../pages/fashion.html';
            fetchData();

        } else if (selectCategoryRefVal === 'Kids') {
            window.location = '../pages/kids.html';
            fetchData();

        }
    }
}


function fetchData() {
    var selectCategoryRefVal = localStorage.getItem('selectedCategory');
    var currentuseruid = localStorage.getItem('currentUID')
    console.log(selectCategoryRefVal)
    swal({
        title: "Loading....!",
        text: "Please wait a moment, data searching....",
        timer: 4000,
        showConfirmButton: false
    });
    db.ref('/Ads/' + selectCategoryRefVal + '/').on('child_added', (snapshot) => {
        // console.log(snapshot.key)
        // console.log(snapshot, 'fetchData')
        var snap = snapshot;
        var keyName = snap.key;
        // console.log(keyName);
        var snapVals = snapshot.val();
        // console.log(snapVals);
        var categoryName = snapVals.Category;
        // console.log(categoryName);
        var snapUserUID = snapVals.UserUID;
        // console.log(snapUserUID);
        var favoritePath = keyName;

        var cardDivs = document.createElement('div');
        cardDivs.setAttribute('id', 'cardDiv');
        cardDivs.setAttribute('class', 'card');
        cardDivs.setAttribute('class', 'col-md-3');
        var imgBoxs = document.createElement('img');
        imgBoxs.setAttribute('id', 'imgBox');
        imgBoxs.setAttribute('class', 'card-img-top')
        imgBoxs.src = snapVals.ImageURL;
        var titleDivs = document.createElement('div');
        titleDivs.setAttribute('id', favoritePath);
        titleDivs.setAttribute('class', 'card-img-top titleDiv');
        var headTitle = document.createElement('h4');
        headTitle.setAttribute('id', 'head5');
        headTitle.innerHTML = snapVals.Title;
        var paraModels = document.createElement('p')
        paraModels.setAttribute('id', 'paraModel')
        paraModels.innerHTML = snapVals.Model;
        var spanText = document.createElement('span');
        // spanText.setAttribute('id', 'spanTexts');
        var createText = document.createTextNode('Rs:');
        spanText.appendChild(createText);
        var prizeSpan = document.createElement('span');
        prizeSpan.innerHTML = snapVals.Prize;
        var lineBreak = document.createElement('br');
        var iconSpan = document.createElement('span');
        iconSpan.setAttribute('class', 'spanClass');
        iconSpan.style.fontSize = '50px';
        iconSpan.setAttribute('class', 'glyphicon glyphicon-heart-empty');
        var moreBtn = document.createElement('button');
        moreBtn.setAttribute('class', 'btn btn-md btn-success butn');
        var moreBtnText = document.createTextNode('Details')
        moreBtn.appendChild(moreBtnText);

        (function el() {
            db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                var favkey = snapObj.key;
                console.log(favkey);
                db.ref('/Ads/').on('child_added', (snapshot) => {
                    for (var key in snapshot.val()) {
                        if (key === favkey) {
                            var favObj = snapshot.val()[key];
                            console.log(favObj)
                            favArray.push(favObj)
                            localStorage.setItem('Favorite Array', JSON.stringify(favArray));
                        }
                    }
                })
            });
            db.ref('/Ads/').on('child_added', (snapkeys) => {
                for (var key in snapkeys.val()) {
                    console.log(key)
                    db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                        var favkey = snapObj.key;
                        console.log(favkey);
                        if (favkey === favoritePath) {
                            iconSpan.style.color = 'red';
                        }
                    })
                }
            })
        })();

        iconSpan.onclick = function (ev) {
            if (currentuseruid === null) {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'First You Log In Our Website..'
                },
                    function () {
                        window.location.href = './pages/logIn.html';
                    })
            }
            else {
                if (currentuseruid === snapVals.UserUID) {
                    swal({
                        type: 'error',
                        title: 'Oops Its Your Own Post...',
                        timer: 2000,
                        showConfirmButton: false,
                    })
                }

                else {
                    var getPath = ev.path[1].id;
                    console.log(getPath);
                    if (iconSpan.style.color !== 'red') {
                        iconSpan.style.color = 'red';
                        db.ref('/Favorite/' + currentuseruid + '/' + getPath + '/').push('true');
                        // db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                        //     var favkey = snapObj.key;
                        //     db.ref('/Ads/').on('child_added', (snapshot) => {
                        //         for (var key in snapshot.val()) {
                        //             if (key === favkey) {
                        //                 var favObj = snapshot.val()[key];
                        //                 console.log(favObj)
                        //                 favArray.push(favObj)
                        //                 localStorage.setItem('Favorite Array', JSON.stringify(favArray));
                        //             }
                        //         }
                        //     })
                        // })
                    }
                    else if (iconSpan.style.color === 'red') {
                        iconSpan.style.color = 'black';
                        db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                            var favObj = snapObj.val();
                            console.log(favObj);
                            db.ref('/Favorite/' + currentuseruid + '/' + getPath + '/').remove()
                        })
                    }
                    // else if (iconSpan.style.color === 'black') {
                    //     iconSpan.style.color = 'red';
                    //     db.ref('/Favorite/' + currentuseruid + getPath).push('true');
                    // }
                }
            }
        }

        moreBtn.onclick = function (ev) {
            var getPath = ev.path[1].id;
            localStorage.setItem('Detail Path', getPath);
            window.location = '../pages/detail.html';
        }

        cardDivs.appendChild(imgBoxs);
        cardDivs.appendChild(titleDivs);
        titleDivs.appendChild(headTitle);
        titleDivs.appendChild(paraModels);
        titleDivs.appendChild(createText);
        titleDivs.appendChild(prizeSpan);
        titleDivs.appendChild(lineBreak);
        titleDivs.appendChild(iconSpan);
        titleDivs.appendChild(moreBtn);
        cardDivs.appendChild(titleDivs);
        searchFetchiDiv.appendChild(cardDivs);
    })
}

// Search Category Vice Work End Here

// search anyThing work start from here
var searchAnythings = document.getElementById('index-page-search');
function searchAnything() {
    var searchAnythingVal = searchAnythings.value;
    console.log(searchAnythingVal)
    var searchAnythingStore = localStorage.setItem('searchAnythingStore', searchAnythingVal)
    window.location = "../pages/search-anything.html";
}

function fetchSearchData() {
    var searchVal = localStorage.getItem('searchAnythingStore');
    console.log(searchVal);
    var currentuseruid = localStorage.getItem('currentUID')
    var fetchAnyThing = document.getElementById('fetchAnythingDiv');
    db.ref('/Ads/').on('child_added', (searchSnap) => {
        for (var key in searchSnap.val()) {
            console.log(key);
            var snapObj = searchSnap.val()[key];
            console.log(snapObj)
            // }
            // var snapKey = searchSnap;
            // console.log(snapKey);
            // var snapval = searchSnap.val();
            // console.log(snapval);
            // var snapObj = Object.values(snapval)
            // var snapObjkey = Object.keys(snapval)
            // console.log(snapObj);
            // console.log(snapObjkey);
            // for (i = 0; i < snapObj.length; i++) {
            var titleVal = snapObj.Title;
            var categoryVal = snapObj.Category;
            var modelVal = snapObj.Model;
            var descriptionVal = snapObj.Description;
            var imageUrl = snapObj.ImageURL;
            var prize = snapObj.Prize;
            var userUID = snapObj.UserUID;
            console.log(userUID)
            // console.log(titleVal);
            // console.log(categoryVal);
            // console.log(modelVal);
            // console.log(descriptionVal);

            if (searchVal.toLowerCase() === titleVal.toLowerCase() || searchVal.toLowerCase() === categoryVal.toLowerCase() ||
                searchVal.toLowerCase() == modelVal.toLowerCase() || titleVal.toLowerCase().search(searchVal.toLowerCase()) !== -1 ||
                categoryVal.toLowerCase().search(searchVal.toLowerCase()) !== -1 || modelVal.toLowerCase().search(searchVal.toLowerCase()) !== -1) {
                // var detailPath = snapObjkey;

                var cardDivs = document.createElement('div');
                cardDivs.setAttribute('id', 'cardDiv');
                cardDivs.setAttribute('class', 'card');
                cardDivs.setAttribute('class', 'col-md-3');
                var imgBoxs = document.createElement('img');
                imgBoxs.setAttribute('id', 'imgBox');
                imgBoxs.setAttribute('class', 'card-img-top')
                imgBoxs.src = imageUrl;
                var titleDivs = document.createElement('div');
                titleDivs.setAttribute('id', key);
                titleDivs.setAttribute('class', 'card-img-top titleDiv');
                var headTitle = document.createElement('h4');
                headTitle.setAttribute('id', 'head5');
                headTitle.innerHTML = titleVal;
                var paraModels = document.createElement('p')
                paraModels.setAttribute('id', 'paraModel')
                paraModels.innerHTML = modelVal;
                var spanText = document.createElement('span');
                var createText = document.createTextNode('Rs:');
                spanText.appendChild(createText);
                var prizeSpan = document.createElement('span');
                prizeSpan.innerHTML = prize;
                var lineBreak = document.createElement('br');
                var iconSpan = document.createElement('span');
                iconSpan.setAttribute('class', 'spanClass');
                iconSpan.style.fontSize = '50px';
                iconSpan.setAttribute('class', 'glyphicon glyphicon-heart-empty');
                var moreBtn = document.createElement('button');
                moreBtn.setAttribute('class', 'btn btn-md btn-success butn');
                var moreBtnText = document.createTextNode('Details')
                moreBtn.appendChild(moreBtnText);

                (function el() {
                    db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                        var favkey = snapObj.key;
                        console.log(favkey);
                        db.ref('/Ads/').on('child_added', (snapshot) => {
                            for (var key in snapshot.val()) {
                                if (key === favkey) {
                                    var favObj = snapshot.val()[key];
                                    console.log(favObj)
                                    favArray.push(favObj)
                                    localStorage.setItem('Favorite Array', JSON.stringify(favArray));
                                }
                            }
                        })
                    });
                    db.ref('/Ads/').on('child_added', (snapkeys) => {
                        for (var key in snapkeys.val()) {
                            console.log(key)
                            db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                                var favkey = snapObj.key;
                                console.log(favkey);
                                console.log(key);
                                if (key === favkey) {
                                    iconSpan.style.color = 'red';
                                }
                            })
                        }
                    })
                })();

                iconSpan.onclick = function (ev) {
                    if (currentuseruid === null) {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'First You Log In Our Website..'
                        },
                            function () {
                                window.location.href = '../pages/logIn.html';
                            })
                    }
                    else {
                        if (currentuseruid === userUID) {
                            swal({
                                type: 'error',
                                title: 'Oops Its Your Own Post...',
                                timer: 2000,
                                showConfirmButton: false,
                            })
                        }

                        else {
                            var getPath = ev.path[1].id;
                            console.log(getPath);
                            if (iconSpan.style.color !== 'red') {
                                iconSpan.style.color = 'red';
                                db.ref('/Favorite/' + currentuseruid + '/' + getPath + '/').push('true');
                            }
                            else if (iconSpan.style.color === 'red') {
                                iconSpan.style.color = 'black';
                                db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (snapObj) => {
                                    var favObj = snapObj.val();
                                    console.log(favObj);
                                    db.ref('/Favorite/' + currentuseruid + '/' + getPath + '/').remove()
                                })
                            }
                        }
                    }
                }

                moreBtn.onclick = function (ev) {
                    var getPath = ev.path[1].id;
                    localStorage.setItem('Detail Path', getPath);
                    window.location = '../pages/detail.html';
                }

                cardDivs.appendChild(imgBoxs);
                cardDivs.appendChild(titleDivs);
                titleDivs.appendChild(headTitle);
                titleDivs.appendChild(paraModels);
                titleDivs.appendChild(createText);
                titleDivs.appendChild(prizeSpan);
                titleDivs.appendChild(lineBreak);
                titleDivs.appendChild(iconSpan);
                titleDivs.appendChild(moreBtn);
                cardDivs.appendChild(titleDivs);
                fetchAnyThing.appendChild(cardDivs);
            }
        }
    })
}
// search anyThing work end here


// favorite Data Work Start From Here
function fetchFavorite() {
    var currentuseruid = localStorage.getItem('currentUID');
    // console.log(currentuseruid);
    if (currentuseruid === null) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'First You Log In Our Website..'
        },
            function () {
                window.location.href = '../pages/logIn.html';
            })
    }
    else {
        swal({
            title: "Loading....!",
            text: "Please wait a moment, data searching....",
            timer: 4000,
            showConfirmButton: false
        });

        db.ref('/Ads/').on('child_added', (snapKeys) => {
            var snap = snapKeys.key;
            var snapVals = snapKeys.val()
            // console.log(snap);
        })

        db.ref('/Favorite/' + currentuseruid + '/').on('child_added', (favSnap) => {
            var snap = favSnap;
            var keyName = snap.key;
            db.ref('/Ads/').on('child_added', (snapshot) => {
                // console.log(snapshot.val())
                for (var key in snapshot.val()) {
                    // console.log(key)
                    if (key === keyName) {
                        // console.log(key)
                        var obj = snapshot.val()[key]
                        fav(obj.ImageURL, key, obj.Title, obj.Model, obj.Prize)
                    }
                }
            })
        })
    }
}

function fav(imgUrl, favoritePath, titleTxt, model, prize) {
    var currentuseruid = localStorage.getItem('currentUID');
    var cardDivs = document.createElement('div');
    cardDivs.setAttribute('id', 'cardDiv');
    cardDivs.setAttribute('class', 'card');
    cardDivs.setAttribute('class', 'col-md-3');
    var imgBoxs = document.createElement('img');
    imgBoxs.setAttribute('id', 'imgBox');
    imgBoxs.setAttribute('class', 'card-img-top')
    imgBoxs.src = imgUrl;
    var titleDivs = document.createElement('div');
    titleDivs.setAttribute('id', favoritePath);
    titleDivs.setAttribute('class', 'card-img-top titleDiv');
    var headTitle = document.createElement('h4');
    headTitle.setAttribute('id', 'head5');
    headTitle.innerHTML = titleTxt;
    var paraModels = document.createElement('p')
    paraModels.setAttribute('id', 'paraModel')
    paraModels.innerHTML = model;
    var spanText = document.createElement('span');
    var createText = document.createTextNode('Rs:');
    spanText.appendChild(createText);
    var prizeSpan = document.createElement('span');
    prizeSpan.innerHTML = prize;
    var lineBreak = document.createElement('br');
    var iconSpan = document.createElement('span');
    iconSpan.setAttribute('class', 'spanClass');
    iconSpan.style.fontSize = '50px';
    iconSpan.style.color = 'red';
    iconSpan.setAttribute('class', 'glyphicon glyphicon-heart-empty');
    iconSpan.onclick = function (ev) {
        var getFavPath = ev.path[1].id;
        console.log(getFavPath);
        db.ref('/Favorite/' + currentuseruid + '/' + getFavPath + '/').remove();
        iconSpan.style.color = 'black';
        document.getElementById(getFavPath).parentElement.style.display = 'none';
    }
    var moreBtn = document.createElement('button');
    moreBtn.setAttribute('class', 'btn btn-md btn-success butn');
    var moreBtnText = document.createTextNode('Details')
    moreBtn.appendChild(moreBtnText);

    moreBtn.onclick = function (ev) {
        var getPath = ev.path[1].id;
        localStorage.setItem('Detail Path', getPath);
        window.location = '../pages/detail.html';
    }

    cardDivs.appendChild(imgBoxs);
    cardDivs.appendChild(titleDivs);
    titleDivs.appendChild(headTitle);
    titleDivs.appendChild(paraModels);
    titleDivs.appendChild(createText);
    titleDivs.appendChild(prizeSpan);
    titleDivs.appendChild(lineBreak);
    titleDivs.appendChild(iconSpan);
    titleDivs.appendChild(moreBtn);
    cardDivs.appendChild(titleDivs);
    favFetchiDiv.appendChild(cardDivs);
}

// favorite Data Work End Here

// Detail Work Start From Here

var imgRef = document.getElementById('imgsrc');
var dataCategoryRef = document.getElementById('dataCategory');
var dataTitleRef = document.getElementById('dataTitle');
var dataModelRef = document.getElementById('dataModel');
var dataYearRef = document.getElementById('dataYear');
var dataPrizeRef = document.getElementById('dataPrize');
var dataDescriptionRef = document.getElementById('dataDescription');
var msgSendDiv = document.getElementsByClassName('msgSendDiv');
var ulList = document.getElementById('ulList');
var ulMsgList = document.getElementById('ulMsgList');
var backUl = document.getElementById('backUl');
var msgSendDiv = document.getElementsByClassName('msgSendDiv');
var scrollDiv = document.getElementById('chatDataFetch');
function singleData() {
    backUl.style.display = 'none';
    ulList.style.display = 'block';
    ulMsgList.style.display = 'none';
    var currentUserUID = localStorage.getItem('currentUID');
    console.log(currentUserUID)
    var getDetailPath = localStorage.getItem('Detail Path');
    console.log(getDetailPath);
    var msgSendPath;
    db.ref('/Ads/').on('child_added', (snapshot) => {
        var objs = snapshot.val();
        console.log(objs)
        for (var key in snapshot.val()) {
            console.log(key)
            if (key === getDetailPath) {
                console.log(key)
                var detailObj = snapshot.val()[key]
                console.log(detailObj);
                msgSendPath = getDetailPath;
                console.log(detailObj.UserUID);
                msgSendDiv[0].setAttribute('id', msgSendPath);
                // console.log(typeof msgSendPath);
                imgRef.src = detailObj.ImageURL;
                dataCategoryRef.innerHTML = detailObj.Category;
                dataTitleRef.innerHTML = detailObj.Title;
                dataModelRef.innerHTML = detailObj.Model;
                dataYearRef.innerHTML = detailObj.Year;
                dataPrizeRef.innerHTML = detailObj.Prize;
                dataDescriptionRef.innerHTML = detailObj.Description;
                console.log(msgSendPath, 'msgSendPath')
                if (detailObj.UserUID === currentUserUID) {
                    db.ref('/Ads/' + detailObj.Category + '/' + msgSendPath + '/message/').on('child_added', (snapChats) => {
                        var msgObj = snapChats.key;
                        console.log(msgObj, 'msgObj');
                        db.ref('/UsersData/' + msgObj + '/').on('child_added', (snapName) => {
                            var snap = snapName.val();
                            var userName = snap.Name;
                            console.log(userName);
                            var chatList = document.createElement('li');
                            chatList.setAttribute('id', msgObj);
                            var chatBtn = document.createElement('button');
                            chatBtn.setAttribute('class', 'btn btn-info');
                            var btnText = document.createTextNode(userName);
                            chatBtn.appendChild(btnText);
                            chatList.appendChild(chatBtn);
                            ulList.appendChild(chatList);
                            chatBtn.onclick = function (ev) {
                                var chatUser = ev.path[1].id;
                                console.log(chatUser);
                                localStorage.setItem('ChatUserUID', chatUser);
                                msgSendDiv[0].style.display = 'block';
                                backUl.style.display = 'block';
                                ulList.style.display = 'none';
                                ulMsgList.style.display = 'block';
                                if (backUl.style.display === 'block') {
                                    document.getElementById('chatDataFetch').style.height = '75%';
                                }
                                db.ref('/Ads/' + detailObj.Category + '/' + msgSendPath + '/message/' + chatUser + '/').on('child_added', (snapChat) => {
                                    var singleChat = snapChat.val();
                                    console.log(singleChat);
                                    var textVal = singleChat.Text;
                                    console.log(textVal);
                                    var msgList = document.createElement('li');
                                    var textVal = document.createTextNode(textVal);
                                    msgList.appendChild(textVal);
                                    ulMsgList.appendChild(msgList);
                                    (() => {
                                        // items = document.getElementsByTagName(li);
                                        // last = items[items.length - 1];
                                        // last.scrollIntoView();
                                        ulMsgList.scrollTop = ulMsgList.scrollHeight;
                                        // scrollDiv.scrollTop = scrollDiv.scrollHeight;
                                    })()
                                    if (singleChat.UID === currentUserUID) {
                                        msgList.style.textAlign = 'right';
                                        msgList.style.cssFloat = 'right';
                                        msgList.style.marginRight = '4px';
                                    }
                                    else {
                                        msgList.style.textAlign = 'left';
                                        msgList.style.cssFloat = 'left';
                                        msgList.style.marginLeft = '4px';
                                    }
                                })
                            }
                        })
                    })
                }
                else {
                    backUl.style.display = 'none';
                    ulList.style.display = 'none';
                    ulMsgList.style.display = 'block';
                    ulMsgList.innerHTML = '';
                    db.ref('/Ads/' + detailObj.Category + '/' + key + '/message/' + currentUserUID + '/').on('child_added', (snapText) => {
                        var textVal = snapText.val();
                        console.log(textVal);
                        var msgList = document.createElement('li');
                        var para = document.createElement('p');
                        para.setAttribute('class', 'text');
                        para.innerHTML = textVal.Text;
                        var textList = document.createTextNode(textVal.Text);
                        msgList.appendChild(para);
                        ulMsgList.appendChild(msgList);
                        (() => {
                            items = document.getElementsByTagName(li);
                            last = items[items.length - 1];
                            last.scrollIntoView();
                            // ulMsgList.scrollTop = ulMsgList.scrollHeight;
                            // scrollDiv.scrollTop = scrollDiv.scrollHeight;
                        })()
                        if (textVal.UID === currentUserUID) {
                            msgList.style.textAlign = 'right';
                            msgList.style.cssFloat = 'right';
                            msgList.style.marginRight = '4px';

                        }
                        else {
                            msgList.style.textAlign = 'left';
                            msgList.style.cssFloat = 'left';
                            msgList.style.marginLeft = '4px';
                        }
                    });
                }
            }
        }
    });
}
function back() {
    ulMsgList.innerHTML = "";
    msgSendDiv[0].style.display = 'none';
    backUl.style.display = 'none';
    ulList.style.display = 'block';
    ulMsgList.style.display = 'none';
    if (ulList.style.display === 'block') {
        document.getElementById('chatDataFetch').style.height = '85%';

    }
}
// chat Waor Start From Here

var textRef = document.getElementById('text');
var timeing = new Date();
function chatting() {
    var currentUserUID = localStorage.getItem('currentUID');
    console.log(currentUserUID)
    if (currentUserUID === null) {
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'First You Log In Our Website..'
        },
            function () {
                window.location.href = '../pages/logIn.html';
            })
    }
    else {
        var nodeID = document.getElementById('butn').parentNode.id;
        console.log(nodeID);
        if (ulList.style.display === 'block') {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'First You Open Any Chat..'
            })
        }
        else {
            var msgTime = timeing.getMilliseconds();
            db.ref('/Ads/').on('child_added', (snapshot) => {
                for (var key in snapshot.val()) {
                    if (key === nodeID) {
                        var postedObj = snapshot.val()[key]
                        console.log(postedObj)
                        var postUID = postedObj.UserUID;
                        var postCategory = postedObj.Category;
                        console.log(postUID);
                        if (currentUserUID !== postUID) {
                            var textRefVal = textRef.value;
                            console.log(textRefVal);
                            if (textRefVal !== '') {
                                var msgObj = {
                                    UID: currentUserUID,
                                    Text: textRefVal,
                                    Time: msgTime
                                }
                                db.ref('/Ads/' + postCategory + '/' + key + '/message/' + currentUserUID + '/').push(msgObj);
                                textRef.value = '';
                            }
                            else {
                                swal({
                                    title: 'error',
                                    text: "Please Type Something....",
                                });
                            }
                        }
                        else {
                            var chatUser = localStorage.getItem('ChatUserUID');
                            console.log(chatUser);
                            var textRefVal = textRef.value;
                            console.log(textRefVal);
                            if (textRefVal !== '') {
                                var msgObj = {
                                    UID: currentUserUID,
                                    Text: textRefVal,
                                    Time: msgTime
                                }
                                db.ref('/Ads/' + postCategory + '/' + nodeID + '/message/' + chatUser + '/').push(msgObj);
                                textRef.value = '';
                            }
                            else {
                                swal({
                                    title: 'error',
                                    text: "Please Type Something....",
                                });
                            }
                        }
                    }
                }

            })
        }
    }

}

// chat Waor end Here


// Detail Work End Here

// ServiceWorker Work Start From Here

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}