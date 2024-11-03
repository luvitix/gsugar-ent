


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
var community_open = ""

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
    
    if (community_open == 1) {
        document.getElementById('top_line').textContent = "GSUGAR"
        document.getElementById('top_btn').onclick = function() {
            closeSpecial()
        }
        control_key = ["home_tab", "collection_tab", "shop_tab", "event_tab"]
        document.getElementById("Community_section").style.display = "none"
        document.getElementById("testbed").style.backgroundColor = "white"
    } else {}

    document.getElementById("MyPage_trigger").onclick = function() {
        showMypage(key)
    }
}

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
    var heart2 = document.getElementById(e);
    heart2.src = "esset/heart-full.png";
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
    document.getElementById("Community_section").style.display = "none"
    nowtab = key
}

function closeMypae() {
    if (community_open == 1) {
        showCommunity(nowtab)
        document.getElementById("MyPage_section").style.display = "none"
        document.getElementById("button_line").style.display = "flex"
        document.getElementById("ticket_showWindow").style.display = "flex"
    } else {
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
}

function locate (e) {
    window.location.href = e
}


function showCommunity(key) {
    document.getElementById('top_line').textContent = "Community"
    document.getElementById('top_btn').onclick = function() {
        closeCommunity()
    }
    document.getElementById("home_tab").style.display = "none"
    document.getElementById("collection_tab").style.display = "none"
    document.getElementById("shop_tab").style.display = "none"
    document.getElementById("event_tab").style.display = "none"
    document.getElementById("Community_section").style.display = "block"
    document.getElementById("testbed").style.backgroundColor = "#f6f6f6"
    nowtab = key
    loadPosts()
    community_open = 1
}

function closeCommunity() {
    document.getElementById('top_line').textContent = "GSUGAR"
    document.getElementById('top_btn').onclick = function() {
        closeSpecial()
    }
    control_key = ["home_tab", "collection_tab", "shop_tab", "event_tab"]
    document.getElementById(control_key[nowtab]).style.display = "block"
    document.getElementById("Community_section").style.display = "none"
    document.getElementById("testbed").style.backgroundColor = "white"
    community_open = ""
}

// // 게시글 로드
// async function loadPosts() {
//     const postsContainer = document.getElementById('Community_content_section');
//     postsContainer.innerHTML = ''; // 기존 게시글 초기화

//     const doc = await DB.collection('Community').doc('temporarily').get();
//     const data = doc.data();
//     const postIds = (data.list || []).reverse();

//     // 게시글 하나씩 로드
//     for (const postId of postIds) {
//       const post = data[postId];
//       const postElement = document.createElement('div');
//       postElement.classList.add('community_media_style');

//       // 닉네임, 내용, 이미지 추가
//       postElement.innerHTML = `
//         <h4 style="color: blueviolet; margin: 0;" class="black">${post.nickname}</h4>
//         <p style="margin: 0;" class="black">${post.content}</p>
//       `;
//       post.img.forEach((imgPath, index) => {
//         const img = document.createElement('img');
//         STORAGE.ref().child(imgPath).getDownloadURL().then(url => {
//           img.src = url;
//           img.style.width = "50%";
//           img.style.aspectRatio = "1 / 1"
//           img.style.objectFit = "cover";
//           postElement.appendChild(img);
//           img.onclick = function () {
//             openPopup(url)
//           }
//         });
//       });

//       postsContainer.appendChild(postElement);
//     }
//   }

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

// 이미지 클릭 시 팝업 열기
function openPopup(imageSrc) {
    document.getElementById("popupImage").src = imageSrc;
    document.getElementById("imagePopup").style.display = "flex";
}
    
// 팝업 닫기
function closePopup() {
    document.getElementById("imagePopup").style.display = "none";
}