var community_open = ""

var key_value = 0
var community_test1 = 0
var community_test2 = 0
var community_test3 = 0

function click_the_button(e) {
    console.log(e);
    const likeCountElement = document.querySelector(`.${e}.heart_count`);
    const likeImgElement = document.querySelector(`.heart_button.${e}`);
    
    let like_count = Number(likeCountElement.textContent);
    let like_img = likeImgElement.src;
    
    if (like_img.includes("heart-none.png")) {
        likeImgElement.src = "esset/heart-full.png";
        likeCountElement.style.color = "blueviolet";
        like_count += 1;
    } else if (like_img.includes("heart-full.png")) {
        likeImgElement.src = "esset/heart-none.png";
        likeCountElement.style.color = "black";
        like_count -= 1;
    }

    // 업데이트된 좋아요 개수 적용
    likeCountElement.textContent = like_count;
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
            document.querySelectorAll('.heart_count')[e+3].textContent = heart_count
            document.querySelectorAll('.heart_count')[e+3].style.color = "blueviolet"
            heart.src = "esset/heart-full.png"
            document.querySelectorAll('.heart_button')[e+3].src = "esset/heart-full.png";
        } else if (community_test1 == 1) {
            heart_count -= 1
            community_test1 = 0
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "black"
            document.querySelectorAll('.heart_count')[e+3].textContent = heart_count
            document.querySelectorAll('.heart_count')[e+3].style.color = "blueviolet"
            heart.src = "esset/heart-none.png"
            document.querySelectorAll('.heart_button')[e+3].src = "esset/heart-none.png";
        }
    } else if (e == 1) {
        if (community_test2 == 0) {
            heart_count += 1
            community_test2 = 1
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "blueviolet"
            document.querySelectorAll('.heart_count')[e+3].textContent = heart_count
            document.querySelectorAll('.heart_count')[e+3].style.color = "blueviolet"
            heart.src = "esset/heart-full.png"
            document.querySelectorAll('.heart_button')[e+3].src = "esset/heart-full.png";
        } else if (community_test2 == 1) {
            heart_count -= 1
            community_test2 = 0
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "black"
            document.querySelectorAll('.heart_count')[e+3].textContent = heart_count
            document.querySelectorAll('.heart_count')[e+3].style.color = "blueviolet"
            heart.src = "esset/heart-none.png"
            document.querySelectorAll('.heart_button')[e+3].src = "esset/heart-none.png";
        }
    } else if (e == 2) {
        if (community_test3 == 0) {
            heart_count += 1
            community_test3 = 1
            document.querySelectorAll('.heart_count')[e].textContent = heart_count
            document.querySelectorAll('.heart_count')[e].style.color = "blueviolet"
            heart.src = "esset/heart-full.png"
        } else if (community_test3 == 1) {
            heart_count -= 1
            community_test3 = 0
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
    console.log(designHtml)
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


function bottom_button_style(activeTabId) {
    console.log(activeTabId, open_section[activeTabId])
    
    document.getElementById("testbed").style.backgroundColor = "white"
    document.getElementById('top_line').textContent = "GSUGAR";
    document.getElementById('MyPage_img_element').src = "esset/artistticket.png";
    document.getElementById('MyPage_value').textContent = ticket

    // 이전에 열려 있던 탭 숨기기
    document.getElementById(open_tab).style.display = "none";
    try {document.getElementById(open_section[open_tab]).style.display = "none";} catch {}

    // 새로운 활성 탭 표시
    document.getElementById(activeTabId).style.display = "block";

    if (open_tab === activeTabId) {
        try {
            closeSection()
        } catch {}
    }
    
    // 커뮤니티 섹션이 열려 있는 경우 초기화
    if (activeTabId === "home_tab" && open_section[activeTabId] !== null && activeTabId !== open_tab) {
        showSection("home_tab", open_section[activeTabId])
    } else if (activeTabId === "shop_tab" && open_section[activeTabId] !== null && activeTabId !== open_tab) {
        showSection("shop_tab", open_section[activeTabId])
    } else if (activeTabId === "event_tab" && open_section[activeTabId] !== null && activeTabId !== open_tab) {
        showSection("event_tab", open_section[activeTabId])
    } 
    open_tab = activeTabId;

    // 버튼 색상 설정: 선택된 버튼은 보라색, 나머지는 검정색
    document.querySelectorAll(".bottom_button").forEach((button, index) => {
        button.style.backgroundColor = button.getAttribute('onclick').includes(activeTabId) ? "blueviolet" : "black";
    });
}

function showMypage() {
    document.getElementById('top_line').textContent = "MyPage"
    document.getElementById('top_btn').onclick = function() {
        closeMypage()
    }
    document.getElementById("button_line").style.display = "none"
    document.getElementById("testbed").style.backgroundColor = "rgb(14, 18, 32)"
    document.getElementById("ticket_showWindow").style.display = "none"
    document.getElementById("MyPage_section").style.display = "block"

    document.getElementById(open_tab).style.display = "none"
    try {document.getElementById(open_section[open_tab]).style.display = "none"} catch {}
}

function closeMypage() {
    // 공통사안
    document.getElementById('top_line').textContent = "GSUGAR"
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
            closeSpecial()
        }
        document.getElementById(open_tab).style.display = "block"
    }
}

function locate (e) {
    window.location.href = e
}

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
    } else if (sectionType === "Collection_detail_section") {
        document.getElementById("testbed").style.backgroundColor = "rgb(14, 18, 32)"
        document.getElementById('top_line').textContent = ""
        document.getElementById("button_line").style.display = "none"
    }
    document.getElementById(sectionType).style.display = "block";
    open_section[key] = sectionType;
}

function closeSection() {
    // 기본 설정
    document.getElementById('top_btn').onclick = function() {closeSpecial();};
    document.getElementById(open_tab).style.display = "block";
    document.getElementById("testbed").style.backgroundColor = "white";
    document.getElementById(open_section[open_tab]).style.display = "none";
    
    // 섹션별 설정
    if (open_section[open_tab] === "Community_section") {
        document.getElementById('top_line').textContent = "GSUGAR";
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
    } else if (open_section[open_tab] === "Collection_detail_section") {
        document.getElementById('top_line').textContent = "GSUGAR"
        document.getElementById("button_line").style.display = "flex"
    }

    //초기화
    open_detail[open_section[open_tab]] = null;
    open_section[open_tab] = null;
}

async function loadPosts() {
    const postsContainer = document.getElementById('Community_content_section');
    postsContainer.innerHTML = ''; // 기존 게시글 초기화

    const doc = await DB.collection('Community').doc('temporarily').get();
    const data = doc.data();
    const postIds = (data.list || []).reverse();

    // 게시글 하나씩 로드
    for (const postId of postIds) {
        const post = data[postId];
        const postElement = document.createElement('div');
        postElement.classList.add('community_media_style');

        // postId에서 날짜와 시간 추출 및 포맷팅
        const dateTime = postId.match(/z(\d{12})a/)[1]; // YYYYMMDDhhmm 추출
        const formattedTime = `${dateTime.slice(0, 4)}. ${dateTime.slice(4, 6)}. ${dateTime.slice(6, 8)}. ${dateTime.slice(8, 10)}:${dateTime.slice(10, 12)}`;

        // 상단 프로필, 닉네임, 업로드 시간
        postElement.innerHTML = `
            <div style="display: flex;">
                <img src="esset/newalien.png" alt="프로필 사진" style="width: 8vh; height: 8vh; border-radius: 50%;">

                <div style="display: flex; flex-direction: column; margin-left: 10px; justify-content: center;">
                    <div style="display: flex; flex-direction: column;">
                        <h4 class="nickname_style black">${post.nickname}</h4>
                        <p class="time_style black">${formattedTime}</p>
                    </div>
                </div>
            </div>
        `;

        // 글 내용 추가
        const contentElement = document.createElement('div');
        contentElement.textContent = post.content;
        contentElement.classList.add('black');
        postElement.appendChild(contentElement);

        // 이미지 추가
        const imagesContainer = document.createElement('div');
        imagesContainer.style.cssText = "display: flex;";
        
        // 각 이미지를 비동기적으로 가져와 추가
        for (const imgPath of post.img) {
            try {
                const url = await STORAGE.ref().child(imgPath).getDownloadURL();
                const img = document.createElement('img');
                img.src = url;
                img.style.cssText = "width: 50%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px; margin-top: 10px;";
                img.setAttribute('data-url', url); // 데이터 속성에 URL 저장
                img.classList.add('popup-image'); // 특정 클래스 추가

                imagesContainer.appendChild(img);
            } catch (error) {
                console.error("Error fetching image URL for path:", imgPath, error);
            }
        }

        postElement.appendChild(imagesContainer);

        // 좋아요 버튼 추가
        postElement.innerHTML += `
            <div class="heart_btn_box ${postId}" onclick="click_the_button('${postId}')">
                <img class="heart_button ${postId}" src="esset/heart-none.png" alt="좋아요 버튼" style="width: 22px; height: 22px;">
                <p class="heart_count black ${postId}" style="font-size: 18px; margin: 0; margin-left: 8px;">99</p>
            </div>
        `;

        postsContainer.appendChild(postElement);
    }

    // 이미지 클릭 이벤트 위임 설정 (popup-image 클래스만 대상)
    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup-image')) { // 특정 클래스가 있는지 확인
            const imgUrl = event.target.getAttribute('data-url'); // 데이터 속성에서 URL 가져오기
            console.log("Image clicked, URL:", imgUrl);
            openPopup(imgUrl);
        }
    });
}

// Add event listener to all images with the class 'popup-image'
document.querySelectorAll('.popup-image').forEach(function(img) {
    img.addEventListener('click', function() {
        const url = img.getAttribute('data-url'); // Get the data-url attribute
        openPopup(url); // Call the openPopup function
    });
});

async function productSection(key) {
    open_detail['Product_section'] = key
    const doc = await DB.collection('test').doc('md').get();
    const storageRef = STORAGE.ref();
    const imageRef = storageRef.child(doc.data()[key]['img_link']);
    document.getElementById('goodsimage').src = await imageRef.getDownloadURL()
    document.getElementById('goods-title').textContent = doc.data()[key]['title']
    document.getElementById('Product_description').textContent = doc.data()[key]['description']
    document.getElementById('Product_price').textContent = doc.data()[key]['price']
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
    
// 팝업 닫기
function closePopup() {
    document.getElementById("imagePopup").style.display = "none";
    document.getElementById("EventPopup").style.display = "none";
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
    if (progress > 0) {document.getElementById("progress_Bar").style.color = "blueviolet"}
    else {document.getElementById("progress_Bar").style.color = "#f0f0f0"}
    if (progress == 100 && progress_trigger == 0) {
        progress_trigger += 1
        point += 1
    }
    document.getElementById('MyPage_value').textContent = point
}