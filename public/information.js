var community_open = ""

var key_value = 0
var community_test1 = 0
var community_test2 = 0
var community_test3 = 0



function openNowEvent() {
    document.getElementById('test_event_bar').innerHTML =
    `
    <h2 class="event_control black" style=" color: var(--white-tone); background-color: var(--main-color);">진행중 ( 3 )</h2>
    <h2 class="event_control black" onclick="openEndEvent()">종료 ( 0 )</h2>
    `
    document.getElementById('test_event_list').style.display = 'flex'
}

function openEndEvent() {
    document.getElementById('test_event_bar').innerHTML =
    `
    <h2 class="event_control black" onclick="openNowEvent()">진행중 ( 3 )</h2>
    <h2 class="event_control black" style=" color: var(--white-tone); background-color: var(--main-color);">종료 ( 0 )</h2>
    `
    document.getElementById('test_event_list').style.display = 'none'
}

async function sectionDesignFullsize(value, key) {
    const storageRef = STORAGE.ref();
    const imageRef = storageRef.child(value['img_link']);
    const designHtml =
    `<a id=${key} onclick="productSection(this.id); showSection('shop_tab', 'Product_section');">
        <div style="background-color: #f6f6f6; text-align: center; display: flex; justify-content: center; align-items: center; aspect-ratio: 1 / 1; width: 100%;">
            <img src=${await imageRef.getDownloadURL()} alt=${value['title']} style="width: 100%; height: auto;">
        </div>
        <h1 class="testshop_name black">${value['title']}</h1>
        <h2 class="testshop_price black">${value['price']}</h2>
    </a>`
    // console.log(designHtml)
    return designHtml
}

async function sectionDesignAutosize(value, key) {
    const storageRef = STORAGE.ref();
    const imageRef = storageRef.child(value['img_link']);
    const designHtml =
    `<a id=${key} onclick="productSection(this.id); showSection('shop_tab', 'Product_section');">
        <div style="background-color: #f6f6f6; text-align: center; display: flex; justify-content: center; align-items: center; aspect-ratio: 1 / 1; width: 100%;">
            <img src=${await imageRef.getDownloadURL()} alt=${value['title']} style="width: 80%; height: auto;">
        </div>
        <h1 class="testshop_name black">${value['title']}</h1>
        <h2 class="testshop_price black">${value['price']}</h2>
    </a>`
    return designHtml
}

// Firestore에서 링크 가져오기
async function openMediaLink2(key) {
    document.getElementById("testbed").style.display = 'block'
    document.getElementById("var").style.display = 'none'
    document.getElementById("media").style.display = 'none'
    document.getElementById("project").style.display = 'none'
    document.getElementById("capyright").style.display = 'none'
    // loadImage('testbed_album_1.png', 'albumImage');
            
    const doc = await DB.collection('md').doc(key).get();
        // document.getElementById('test_md').textContent = doc.data()['test']['title']
        // document.getElementById('test_md_price').textContent = doc.data()['test']['price']
        // loadImage(doc.data()['test']['img_link'], 'test_md_img');
    let storeContentArray = new Array(doc.data()['list'].length);
    // 모든 비동기 작업을 처리할 Promise 배열 생성
    var promises = doc.data()['list'].reverse().map(async (item, index) => {
        if (doc.data()[item]['design_key'] == "full") {
            let content = await sectionDesignFullsize(doc.data()[item], item);
            storeContentArray[index] = content;
        } else if (doc.data()[item]['design_key'] == "auto") {
            let content = await sectionDesignAutosize(doc.data()[item], item);
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

var open_lounge = "temporarily"
var loungeName = ""
openMediaLink2(open_lounge);
changeLounge();

async function changeLounge() {
    const doc = await DB.collection('ArtistLounge').doc(open_lounge).get()
    const data = doc.data()
    document.documentElement.style.setProperty('--main-color', data.color.maincolor);
    document.documentElement.style.setProperty('--selected-color', data.color.selectedcolor);
    document.documentElement.style.setProperty('--un-bg', data.color.unselected_BGcolor);
    document.documentElement.style.setProperty('--un-color', data.color.unselected_fontColor);
    document.documentElement.style.setProperty('--third-color', data.color.third_color);
    document.documentElement.style.setProperty('--white-tone', data.color.white_tone);
    document.documentElement.style.setProperty('--title-color', data.color.title_color);
    
    loungeName = data.loungeName
    document.getElementById('top_line').textContent = loungeName
    document.getElementById('ArtistName').textContent = data.artistName
    document.getElementById('ArtistDescription').textContent = data.artistDescription
    document.getElementById('Agency_credit').textContent = `Artist Agency : ${data.agency}`
    document.getElementById('Supporter_credit').textContent = `App Supporter : ${data.supporter}`
    document.getElementById('Artist_thumbnail').src = `esset/${open_lounge}.webp`
}

var ticket = 53
var point = 301
var open_tab = "home_tab"
var open_section = {
    "home_tab": null,
    "collection_tab": null,
    "shop_tab": null,
    "event_tab": null
}
var open_detail = {
    "Artist_message_section": null,
    "Artist_content_section": null,
    "Community_section": null,
    "Collection_detail_section": null,
    "Product_section": null,
    "Event_detail_section": null
}

function ArtistLounge() {
    Object.keys(open_detail).forEach(key => {
        open_detail[key] = null;
    });
    try {document.getElementById(open_section[open_tab]).style.display = "none";} catch {document.getElementById(open_tab).style.display = "none";}
    document.getElementById("button_line").style.display = "none"
    document.getElementById('top_line').textContent = ""
    document.documentElement.style.setProperty('--third-color', "#f6f6f6");
    document.documentElement.style.setProperty('--title-color', "grey");
    document.getElementById("testbed").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();
    document.getElementById("ticket_showWindow").style.display = "none"
    Object.keys(open_section).forEach(key => {
        open_section[key] = null;
    });
    document.getElementById('ArtistLounge').style.display = "flex";
}

async function openLounge(key) {
    open_lounge = key
    openMediaLink2(open_lounge);
    await changeLounge(); 
    change_tab('home_tab')
    closeMypage()
    document.getElementById('ArtistLounge').style.display = "none";
}


function change_tab(activeTabId) {
    
    console.log(activeTabId, open_section[activeTabId])
    
    document.getElementById("testbed").style.backgroundColor = "white"
    document.getElementById('top_line').textContent = loungeName
    document.getElementById('MyPage_img_element').src = "esset/artistticket.png";
    document.getElementById('MyPage_value').textContent = ticket

    // 이전에 열려 있던 탭 숨기기
    document.getElementById(open_tab).style.display = "none";
    try {document.getElementById(open_section[open_tab]).style.display = "none";} catch {}

    // 새로운 활성 탭 표시
    document.getElementById(activeTabId).style.display = "block";

    if (open_tab === activeTabId) { try { closeSection() } catch {} }
    
    // 커뮤니티 섹션이 열려 있는 경우 초기화
    if (activeTabId === "home_tab" && open_section[activeTabId] !== null && activeTabId !== open_tab) {
        showSection("home_tab", open_section[activeTabId])
    } else if (activeTabId === "shop_tab" && open_section[activeTabId] !== null && activeTabId !== open_tab) {
        showSection("shop_tab", open_section[activeTabId])
    } else if (activeTabId === "event_tab" && open_section[activeTabId] !== null && activeTabId !== open_tab) {
        showSection("event_tab", open_section[activeTabId])
    } 
    open_tab = activeTabId;

    // 버튼 클래스 설정: 선택된 버튼은 'selected_button', 나머지는 'un_button'
    document.querySelectorAll(".bottom_button").forEach((button) => {
        if (button.getAttribute('onclick').includes(activeTabId)) {
            button.classList.remove('un_button');
            button.classList.add('selected_button');
        } else {
            button.classList.remove('selected_button');
            button.classList.add('un_button');
        }
    });
}

function showMypage() {
    document.getElementById('top_line').textContent = "MyPage"
    document.getElementById('top_btn').onclick = function() {
        closeMypage()
    }
    document.getElementById("button_line").style.display = "none"
    document.getElementById("testbed").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();
    document.getElementById("ticket_showWindow").style.display = "none"
    document.getElementById("MyPage_section").style.display = "block"

    document.getElementById(open_tab).style.display = "none"
    try {document.getElementById(open_section[open_tab]).style.display = "none"} catch {}
}

function closeMypage() {
    // 공통사안
    document.getElementById('top_line').textContent = loungeName
    document.getElementById("MyPage_section").style.display = "none"
    document.getElementById("button_line").style.display = "flex"
    document.getElementById("ticket_showWindow").style.display = "flex"
    document.getElementById("testbed").style.backgroundColor = "white"

    // 오픈한 세부 섹션이 있을 경우
    if (open_section[open_tab] && open_tab) {
        showSection(open_tab, open_section[open_tab])
    
    // 오픈한 세부 섹션이 없을 경우
    } else {
        document.getElementById('top_btn').onclick = function() {
            ArtistLounge()
        }
        document.getElementById(open_tab).style.display = "block"
    }
}

function locate (e) {
    window.location.href = e
}

// 페이지 로드 시 URL에 '?community'가 포함되어 있는지 확인
window.addEventListener('load', function() {
    // 현재 URL 확인
    const currentUrl = window.location.href;

    // URL에 '?community'가 포함되어 있으면 showSection 호출
    if (currentUrl.includes('?community')) {
        showSection('home_tab', 'Community_section');
    }
});

function showSection(key, sectionType) {
    console.log(sectionType)
    // 공통 설정
    document.getElementById('top_btn').onclick = function() {closeSection(sectionType);};
    document.getElementById("home_tab").style.display = "none";
    document.getElementById("collection_tab").style.display = "none";
    document.getElementById("shop_tab").style.display = "none";
    document.getElementById("event_tab").style.display = "none";
    document.getElementById("testbed").style.backgroundColor = "#f6f6f6";
    open_tab = key;

    // 섹션별 설정
    if (sectionType === "Community_section") {
        document.getElementById('top_line').textContent = "Community";
        loadPosts();
    } else if (sectionType === "Artist_message_section") {
        document.getElementById('MyPage_img_element').src = "esset/artistpoint.webp";
        document.getElementById('MyPage_value').textContent = point
    } else if (sectionType === "Product_section" && open_detail[sectionType] !== null) {
        productSection(open_detail[sectionType])
    } else if (sectionType === "Artist_content_section") {
        document.getElementById('MyPage_img_element').src = "esset/artistpoint.webp";
        document.getElementById('MyPage_value').textContent = point
    } else if (sectionType === "Collection_detail_section" || "Event_detail_section") {
        document.getElementById("testbed").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();
        document.getElementById('top_line').textContent = ""
        document.getElementById("button_line").style.display = "none"
    }
    document.getElementById(sectionType).style.display = "block";
    open_section[key] = sectionType;
}

function closeSection() {
    // 기본 설정
    document.getElementById('top_btn').onclick = function() {ArtistLounge();};
    document.getElementById(open_tab).style.display = "block";
    document.getElementById("testbed").style.backgroundColor = "white";
    document.getElementById(open_section[open_tab]).style.display = "none";
    
    // 섹션별 설정
    if (open_section[open_tab] === "Community_section") {
        document.getElementById('top_line').textContent = loungeName
    } else if (open_section[open_tab] === "Artist_message_section") {
        document.getElementById('MyPage_img_element').src = "esset/artistticket.png";
        document.getElementById('MyPage_value').textContent = ticket
    } else if (open_section[open_tab] === "Product_section") {
        document.getElementById('goodsimage').src = ""
        document.getElementById('goods-title').textContent = ""
        document.getElementById('Product_description').textContent = ""
        document.getElementById('Product_price').textContent = ""
    } else if (open_section[open_tab] === "Artist_content_section") {
        document.getElementById('MyPage_img_element').src = "esset/artistticket.png";
        document.getElementById('MyPage_value').textContent = ticket
    } else if (open_section[open_tab] === "Collection_detail_section" || open_section[open_tab] === "Event_detail_section") {
        document.getElementById('top_line').textContent = loungeName
        document.getElementById("button_line").style.display = "flex"
    }

    //초기화
    open_detail[open_section[open_tab]] = null;
    open_section[open_tab] = null;
}

async function productSection(key) {
    open_detail['Product_section'] = key
    const doc = await DB.collection('md').doc(open_lounge).get();
    const storageRef = STORAGE.ref();
    const imageRef = storageRef.child(doc.data()[key]['img_link']);
    document.getElementById('goodsimage').src = await imageRef.getDownloadURL()
    document.getElementById('goods-title').textContent = doc.data()[key]['title']
    document.getElementById('Product_description').textContent = doc.data()[key]['description']
    document.getElementById('Product_price').textContent = doc.data()[key]['price']
    document.getElementById('extra_description').innerText = doc.data()[key]['extra_description']
}

// 이미지 클릭 시 팝업 열기
function openPopup(imageSrc) {
    console.log("정상")
    document.getElementById("popupImage").src = imageSrc;
    document.getElementById("imagePopup").style.display = "flex";
}

// 이미지 클릭 시 팝업 열기
function EvnetPopup() {
    console.log("정상")
    document.getElementById("EventPopup").style.display = "flex";
}

// 이미지 클릭 시 팝업 열기
function ArtiMessage() {
    console.log("정상")
    document.getElementById("AriMessageSignup").style.display = "flex";
}
    
// 팝업 닫기
function closePopup() {
    document.getElementById("imagePopup").style.display = "none";
    document.getElementById("EventPopup").style.display = "none";
    document.getElementById("AriMessageSignup").style.display = "none";
}

async function Event_load() {
    const doc = await DB.collection('test').doc('event').get();
    document.getElementById("nowEvent").textContent = `진행중 ( ${doc.data()['list'].length} )`
    document.getElementById("endEvent").textContent = `종료 ( ${doc.data()['end_list'].length} )`
}



// 프로그래스바 공간
let progress = 0;
let progress_trigger = 0;

// 프로그래스 증가 함수
function increaseProgress(amount) {
    progress = Math.min(progress + amount, 100); // 최대 100%로 제한
    updateProgressBar();
}

// 프로그래스 초기화 함수
function resetProgress() {
    progress = 0;
    if (progress_trigger == 1) {
        progress_trigger -= 1;
        point -= 1;
    }
    updateProgressBar();

}

// 프로그래스바 업데이트 함수
function updateProgressBar() {
    document.getElementById("progress_Bar").style.width = progress + "%";
    document.getElementById("progress_text").textContent = `컨텐츠 시청 ( ${progress/100} / 1 )`
    if (progress > 0) {document.getElementById("progress_Bar").style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();}
    else {document.getElementById("progress_Bar").style.color = "#f0f0f0"}
    if (progress == 100 && progress_trigger == 0) {
        progress_trigger += 1
        point += 1
    }
    document.getElementById('MyPage_value').textContent = point
}

function eventTicket(value) {
    // Check if the value is NaN or not a number, and set it to 0 if true
    document.getElementById('eventTicket').value = isNaN(Number(document.getElementById('eventTicket').value)) ? 0 : Number(document.getElementById('eventTicket').value);

    if (value === 0 && document.getElementById('eventTicket').value < ticket) {
        document.getElementById('eventTicket').value = Number(document.getElementById('eventTicket').value) + 1
    } else if (value === 1 && document.getElementById('eventTicket').value > 0) {
        document.getElementById('eventTicket').value -= 1
    } else if (document.getElementById('eventTicket').value < 0) { 
        document.getElementById('eventTicket').value = 0 
    } else if (document.getElementById('eventTicket').value > ticket) { 
        document.getElementById('eventTicket').value = ticket
    }
} 