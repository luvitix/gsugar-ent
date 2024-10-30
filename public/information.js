


function load() {
    // 현재 URL 가져오기
    var currentUrl = window.location.href;

    
    var id1 = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    // 이미지 태그 업데이트
    var img = document.getElementById('viewpoint');
    img.src = `esset/${id1}.png`;

    updateContent(id1)
    
}

async function updateContent(id1) {

    var currentUrl = window.location.href;
    var id1 = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
    var set_Element = ['goodsname', 'description', 'price', 'linkconnect']
    for (i = 0; i < set_Element.length; i++) { set_Element[i] = document.getElementById(set_Element[i]) }

    const base_data = await test(id1);
    const now_content = base_data

    if (now_content.exists) {
        objekt_numbering = `${now_content.data()['name']} ${now_content.data()['S_Name']} ${now_content.data()['Season']} ${now_content.data()['O_Number']}`

        set_Element[0].textContent = `${now_content.data()['name']}`
        set_Element[1].innerHTML = `<strong>Number</strong><br>${objekt_numbering}`
        set_Element[2].innerHTML = `<strong>origin</strong><br><a href=${now_content.data()['origin']}><button>원본 보러가기</button></a>`
        set_Element[4].innerHTML = `<strong>Grid_Key</strong><br>${now_content.data()['imsi_key']}`

        if (maker_data.exists) {
            set_Element[3].innerHTML = `<strong>makers</strong><br><a href=${maker_data.data()['M_Link']}><button>${maker_data.data()['M_Name']} 트위터</button></a>`
        } else {
            set_Element[3].innerHTML = `<strong>makers</strong><br><a href=${now_content.data()['maker']}><button>${now_content.data()['maker_name']} 트위터</button></a>`
        }

        document.getElementById("objekt").innerText = objekt_numbering

    } else {
        window.location.href = "error.html";
    }
}

async function test(id1) {
    try {
        var now_content = await DB.collection('goods').doc(id1).get();
        return now_content
    } catch (error) {
        console.error("예외가 발생했습니다:", error);
    }
}

//여기부터

function bottom_button_style(key) {
    // 모든 버튼 요소를 가져옵니다.
    const buttons = document.querySelectorAll(".bottom_button");

    // 반복문을 통해 모든 버튼의 스타일을 설정합니다.
    buttons.forEach((button, index) => {
        if (index === key) {
            // 클릭한 버튼의 배경을 보라색으로 설정
            button.style.backgroundColor = "blueviolet";
        } else {
            // 나머지 버튼은 검정색으로 설정
            button.style.backgroundColor = "black";
        }
    });

    // 모든 탭을 숨깁니다.
    const tabs = {
        0: document.getElementById("home_tab"),
        1: document.getElementById("collection_tab"),
        2: document.getElementById("shop_tab"),
        3: document.getElementById("event_tab")
    };

    // 모든 탭을 숨기고, 클릭한 탭만 보이도록 설정합니다.
    Object.keys(tabs).forEach(index => {
        if (index == key) {
            tabs[index].style.display = "block";
        } else {
            tabs[index].style.display = "none";
        }
    });

    document.getElementById("MyPage_trigger").onclick = function() {
        showMypage(key)
    }
}

var key_value = 0
var community_test1 = 0
var community_test2 = 0

function click_the_button (e) {
    var like_text = document.querySelectorAll('.like_button')[e].textContent;
    var like_count = Number(like_text.split(' ')[1]);
    if (e == 0) {
        if (community_test1 == 0) {
            like_count += 1
            community_test1 = 1
            document.querySelectorAll('.like_button')[e].textContent = `👍 ${like_count}`
            document.querySelectorAll('.like_button')[e].style.color = "blueviolet"
            document.querySelectorAll('.like_button')[e].style.borderColor = "blueviolet"
        } else if (community_test1 == 1) {
            like_count -= 1
            community_test1 = 0
            document.querySelectorAll('.like_button')[e].textContent = `👍 ${like_count}`
            document.querySelectorAll('.like_button')[e].style.color = "black"
            document.querySelectorAll('.like_button')[e].style.borderColor = "black"
        }
    } else if (e == 1) {
        if (community_test2 == 0) {
            like_count += 1
            community_test2 = 1
            document.querySelectorAll('.like_button')[e].textContent = `👍 ${like_count}`
            document.querySelectorAll('.like_button')[e].style.color = "blueviolet"
            document.querySelectorAll('.like_button')[e].style.borderColor = "blueviolet"
        } else if (community_test2 == 1) {
            like_count -= 1
            community_test2 = 0
            document.querySelectorAll('.like_button')[e].textContent = `👍 ${like_count}`
            document.querySelectorAll('.like_button')[e].style.color = "black"
            document.querySelectorAll('.like_button')[e].style.borderColor = "black"
        }
    }
}

function click_the_btn (e) {
    var heart_count = Number(document.querySelectorAll('.heart_count')[e].textContent);
    var heart = document.querySelectorAll('.heart_button')[e];
    if (e == 0) {
        if (community_test1 == 0) {
            heart_count += 1
            community_test1 = 1
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "blueviolet"
            heart.src = "esset/heart-full.png"
        } else if (community_test1 == 1) {
            heart_count -= 1
            community_test1 = 0
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "black"
            heart.src = "esset/heart-none.png"
        }
    } else if (e == 1) {
        if (community_test2 == 0) {
            heart_count += 1
            community_test2 = 1
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "blueviolet"
            heart.src = "esset/heart-full.png"
        } else if (community_test2 == 1) {
            heart_count -= 1
            community_test2 = 0
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "black"
            heart.src = "esset/heart-none.png"
        }
    }
}

function openNowEvent() {
    document.getElementById('test_event_bar').innerHTML =
    `
    <h2 class="event_control black" style=" color: white; background-color: blueviolet;">진행중 ( 3 )</h2>
    <h2 class="event_control black" onclick="openEndEvent()">종료 ( 0 )</h2>
    `
    document.getElementById('test_event_list').style.display = 'flex'
}

function openEndEvent() {
    document.getElementById('test_event_bar').innerHTML =
    `
    <h2 class="event_control black" onclick="openNowEvent()">진행중 ( 3 )</h2>
    <h2 class="event_control black" style=" color: white; background-color: blueviolet;">종료 ( 0 )</h2>
    `
    document.getElementById('test_event_list').style.display = 'none'
}

async function sectionDesignFullsize(key) {
    const storageRef = STORAGE.ref();
    const imageRef = storageRef.child(key['img_link']);
    const designHtml =
    `<a>
        <div style="background-color: #f6f6f6; text-align: center; display: flex; justify-content: center; align-items: center; aspect-ratio: 1 / 1; width: 100%;">
            <img src=${await imageRef.getDownloadURL()} alt=${key['title']} style="width: 100%; height: auto;">
        </div>
        <h1 class="testshop_name black">${key['title']}</h1>
        <h2 class="testshop_price black">${key['price']}</h2>
    </a>`
    console.log(designHtml)
    return designHtml
}

async function sectionDesignAutosize(key) {
    const storageRef = STORAGE.ref();
    const imageRef = storageRef.child(key['img_link']);
    const designHtml =
    `<a>
        <div style="background-color: #f6f6f6; text-align: center; display: flex; justify-content: center; align-items: center; aspect-ratio: 1 / 1; width: 100%;">
            <img src=${await imageRef.getDownloadURL()} alt=${key['title']} style="width: 80%; height: auto;">
        </div>
        <h1 class="testshop_name black">${key['title']}</h1>
        <h2 class="testshop_price black">${key['price']}</h2>
    </a>`
    return designHtml
}

// Firestore에서 링크 가져오기
async function openMediaLink2() {
    document.getElementById("testbed").style.display = 'block'
    document.getElementById("var").style.display = 'none'
    document.getElementById("media").style.display = 'none'
    document.getElementById("project").style.display = 'none'
    document.getElementById("career").style.display = 'none'
    document.getElementById("capyright").style.display = 'none'
    // loadImage('testbed_album_1.png', 'albumImage');
            
    const doc = await DB.collection('test').doc('md').get();
        // document.getElementById('test_md').textContent = doc.data()['test']['title']
        // document.getElementById('test_md_price').textContent = doc.data()['test']['price']
        // loadImage(doc.data()['test']['img_link'], 'test_md_img');
    let storeContentArray = new Array(doc.data()['list'].length);
    // 모든 비동기 작업을 처리할 Promise 배열 생성
    var promises = doc.data()['list'].reverse().map(async (item, index) => {
        if (doc.data()[item]['design_key'] == "full") {
            let content = await sectionDesignFullsize(doc.data()[item]);
            storeContentArray[index] = content;
        } else if (doc.data()[item]['design_key'] == "auto") {
            let content = await sectionDesignAutosize(doc.data()[item]);
            storeContentArray[index] = content;
        }
    });
    // let designHtml = await sectionDesignFullsize(doc.data()['test']);
    // // designHtml += await sectionDesignAutosize(doc.data()['z202410200058a'])
    // document.getElementById('storeContent').innerHTML = storeContent
    // 모든 Promise가 완료된 후에 storeContent를 적용
    await Promise.all(promises);

    // storeContentArray에 있는 모든 결과를 합쳐서 storeContent에 저장
    const storeContent = storeContentArray.join('');
    document.getElementById('storeContent').innerHTML = storeContent;
   
}

var nowtab = ""

function showMypage(key) {
    document.getElementById('top_line').textContent = "MyPage"
    document.getElementById('top_btn').onclick = function() {
        closeMypae()
    }
    document.getElementById("home_tab").style.display = "none"
    document.getElementById("collection_tab").style.display = "none"
    document.getElementById("shop_tab").style.display = "none"
    document.getElementById("event_tab").style.display = "none"
    document.getElementById("button_line").style.display = "none"
    document.getElementById("testbed").style.backgroundColor = "rgb(14, 18, 32)"
    document.getElementById("ticket_showWindow").style.display = "none"
    document.getElementById("MyPage_section").style.display = "block"
    nowtab = key
}

function closeMypae() {
    document.getElementById('top_line').textContent = "GSUGAR"
    document.getElementById('top_btn').onclick = function() {
        closeSpecial()
    }
    control_key = ["home_tab", "collection_tab", "shop_tab", "event_tab"]
    document.getElementById(control_key[nowtab]).style.display = "block"
    document.getElementById("button_line").style.display = "flex"
    document.getElementById("testbed").style.backgroundColor = "white"
    document.getElementById("ticket_showWindow").style.display = "flex"
    document.getElementById("MyPage_section").style.display = "none"
}

function locate (e) {
    window.location.href = e
}