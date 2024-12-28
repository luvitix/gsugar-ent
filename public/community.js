// 전역 변수 선언
let user_IP = "";

// IP 가져오기
fetch("https://api.ipify.org?format=json")
  .then(response => response.json())
  .then(async data => {
    try {
      // XOR 적용
      const xorTransformed = await xorTransform(data.ip);

      // Base64 인코딩
      const encodedData = btoa(xorTransformed);

      // console.log("난독화된 IP:", encodedData);
      user_IP = encodedData; 
    } catch (error) {
      const now = getCurrentFormattedTime()
      const randomString = generateRandomString()
      user_IP = "24hDT"+randomString+now
      console.error("Error in XOR transform:", error);
    }
  })
  .catch(error => {
    console.error("Error fetching IP:", error);
  });

// XOR 변환 함수
async function xorTransform(data) {
  // DB에서 보안 데이터 가져오기
  const doc = await DB.collection("Community").doc(open_lounge).get();
  const sec_dt = doc.data();

  // sec 값이 유효한지 확인
  if (!sec_dt || typeof sec_dt["sec"] !== "number") {
    throw new Error("Invalid security data in database.");
  }

  let transformed = "";
  for (let i = 0; i < data.length; i++) {
    transformed += String.fromCharCode(data.charCodeAt(i) ^ sec_dt["sec"]);
  }
  return transformed;
}

async function callData() {
  const doc = await DB.collection('Community').doc(open_lounge).get();
  const data = doc.data();
  return data
}

let lastScrollPosition = 0; // 스크롤 위치를 저장할 변수
let Scroll_Position = 0;

// 스크롤 위치 저장
function saveScrollPosition() {
    lastScrollPosition = window.scrollY; // 현재 스크롤 위치 저장
    console.log("스크롤 위치 저장됨:", lastScrollPosition);
}

// 스크롤 위치 복원
function restoreScrollPosition() {
    window.scrollTo(0, lastScrollPosition); // 저장된 위치로 스크롤 이동
    console.log("스크롤 위치 복원됨:", lastScrollPosition);
}

// 뷰포인트 감지 이벤트 설정
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  let documentHeight = 1000;

  // 1000px 간격으로 호출
  if (scrollPosition >= documentHeight && open_tab == "home_tab" && open_section['home_tab'] == "Community_section" && scroll_function == false) {
    scroll_function = true
    loadPosts(5);
    documentHeight += 1000;
  } else {
    
  }
});


// 스크롤 이벤트와 버튼으로 제어
// document.addEventListener("scroll", saveScrollPosition); // 스크롤 시 위치 저장

// 현재 시간 가져오기
function getCurrentFormattedTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  return `z${year}${month}${day}${hour}${minute}a`;
}

function generateRandomString(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

async function getHeartImage(variable) {
  const imagePath = `esset/heart-full-${variable}.webp`;
  console.log(imagePath)
  
  try {
      // 파일이 존재하는지 확인
      const response = await fetch(imagePath, { method: 'HEAD' });
      
      // 파일이 존재하면, 존재하는 이미지 URL을 반환
      if (response.ok) {
          return `heart-full-${open_theme}.webp`;
      } else {
          // 파일이 없으면 대체 이미지 반환
          return "heart-full-temporarily.webp";
      }
  } catch (error) {
      console.error("Error checking file existence:", error);
      return "heart-full-temporarily.webp"; // 에러가 나면 기본 이미지 반환
  }
}

async function click_the_button(e) {
    console.log(e);
    const likeCountElement = document.querySelector(`.${e}.heart_count`);
    const likeImgElement = document.querySelector(`.heart_button.${e}`);
    
    let like_count = Number(likeCountElement.textContent);
    let like_img = likeImgElement.src;
    
    if (like_img.includes("heart-none.webp")) {
        likeImgElement.src = `esset/${await getHeartImage(open_theme)}`
        likeCountElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
        try {
          document.querySelector(`.${e}best.heart_count`).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
          document.querySelector(`.heart_button.${e}best`).src = `esset/${await getHeartImage(open_theme)}`
        } catch {
          console.log("best글이 아닙니다")
        }
        // 게시글 ID를 list 배열에 추가
        await DB.collection('Community').doc(open_lounge).update({
          [`${e}.heart.heart`]: firebase.firestore.FieldValue.arrayUnion(user_IP)
        });
    } else if (like_img.includes(`heart-full`)) {
        likeImgElement.src = "esset/heart-none.webp";
        likeCountElement.style.color = "black";
        try {
          document.querySelector(`.${e}best.heart_count`).style.color = "black";
          document.querySelector(`.heart_button.${e}best`).src = "esset/heart-none.webp";
        } catch {
          console.log("best글이 아닙니다")
        }
        // 게시글 ID를 list 배열에 추가
        await DB.collection('Community').doc(open_lounge).update({
          [`${e}.heart.heart`]: firebase.firestore.FieldValue.arrayRemove(user_IP)
        });
    }

    const data = await callData();
    console.log(data[e].heart)

    // 업데이트된 좋아요 개수 적용
    likeCountElement.textContent = data[e].heart.heart.length + data[e].heart.temporarily;
    try {
      document.querySelector(`.${e}best.heart_count`).textContent = data[e].heart.heart.length + data[e].heart.temporarily;
    } catch {
      console.log("best글이 아닙니다")
    }
}

async function share_button(e) {
  navigator.clipboard.writeText(`https://gsugar-ent.netlify.app/funding?community?query=${e}%end`)
  .then(() => {
    alert('게시물의 링크가 복사되었어요!!');
  })
  .catch(err => {
    console.error('클립보드 복사 실패:', err);
  });
}

var selectedFiles = []; // 업로드된 모든 파일을 관리할 배열
const MAX_FILES = 9; // 최대 파일 개수
const imguploaderLabel = document.getElementById("imguploader-label");
const plusimgLabel = document.getElementById("plusimg-label");
let img_handle = true;

// 비동기적으로 FileReader 작업을 처리하는 함수
async function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result); // 파일의 데이터 URL 반환
    };
    reader.readAsDataURL(file);
  });
}

// 파일 업로드 버튼과 연결
const fileInput = document.getElementById("images");
const extraInput = document.getElementById("extra-images");

fileInput.addEventListener("change", handleFileSelection);
extraInput.addEventListener("change", handleFileSelection);

// 이미지 제거 함수
async function removeImage(index) {
  if (img_handle == true) {
    try {
      img_handle = false;
      selectedFiles.splice(index, 1); // 배열에서 제거
    } catch {
      img_handle = true;
      await renderPreviews();
    } finally {
      img_handle = true;
      await renderPreviews();
    }
  } else {

  }
}

// 이미지 미리보기 렌더링 함수
async function renderPreviews() {
  const previewSection = document.getElementById('preview-section');
  
  imguploaderLabel.style.display = "none";
  plusimgLabel.style.display = "none";
  if (img_handle == true) {
  try {
    
    img_handle = false;
    previewSection.innerHTML = ""; // 기존 미리보기 초기화
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const dataURL = await readFileAsDataURL(file); // 파일 순서대로 읽기

      const img = document.createElement('img');
      img.src = dataURL;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.objectFit = "cover";
      img.style.border = "1px solid #ddd";
      img.style.borderRadius = "5px";
      img.style.cursor = "pointer";

      // 클릭 이벤트: 이미지를 클릭하면 배열에서 제거
      img.addEventListener('click', function () {
        removeImage(i);
      });

      previewSection.appendChild(img); // 미리보기 섹션에 추가
    }
  } catch {
    img_handle = true;
    await renderPreviews();
  } finally {
    img_handle = true;
    await updateUI();
  }

} else {
  
}
}

// 파일 선택 이벤트 처리 함수
async function handleFileSelection(event) {
    const files = event.target.files;

    try {
    // 현재 파일 개수와 새로 추가될 파일 개수 확인
    if (selectedFiles.length + files.length > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개 파일만 업로드할 수 있습니다.`);
    } else {
      Array.from(files).forEach((file) => {
        selectedFiles.push(file);
      });
    }
    } finally {
      await renderPreviews();
    }
}
  
// UI 업데이트 함수
async function updateUI() {
  const imguploaderLabel = document.getElementById("imguploader-label");
  const plusimgLabel = document.getElementById("plusimg-label");
  
  if (selectedFiles.length === 0) {
    imguploaderLabel.style.display = "block";
    plusimgLabel.style.display = "none";
  } else if (selectedFiles.length < MAX_FILES) {
    imguploaderLabel.style.display = "none";
    plusimgLabel.style.display = "block";
  } else if (selectedFiles.length === MAX_FILES) {
    imguploaderLabel.style.display = "none";
    plusimgLabel.style.display = "none";
  }
}

// // 초기 파일 선택 이벤트 연결
// document.getElementById('images').addEventListener('change', handleFileSelection);

// // 추가 업로드 버튼에 파일 선택 이벤트 연결
// document.getElementById('extra-images').addEventListener('change', handleFileSelection);




function openWriteSection() {
  saveScrollPosition();
  document.getElementById("write_button").style.display = "block"
  document.getElementById('top_btn').onclick = function() {closeWriteSecton();};
  document.getElementById("write_button_mobile").style.display = "none"
  document.getElementById("Community_content_section").style.display = "none"
  document.getElementById("button_line").style.display = "none"
  document.getElementById("ticket_showWindow").style.display = "none"
}

function closeWriteSecton() {
  
  document.getElementById("write_button").style.display = ""
  document.getElementById('top_btn').onclick = function() {closeSection("Community_section");};
  document.getElementById("write_button_mobile").style.display = ""
  document.getElementById("Community_content_section").style.display = "block"
  document.getElementById("button_line").style.display = "flex"
  document.getElementById("ticket_showWindow").style.display = "flex"
  restoreScrollPosition();
}

let dontAgainLoading = false;

function timerate(e, over) {
  // postId에서 날짜와 시간 추출 및 포맷팅
  const dateTime = e.match(/z(\d{12})a/)[1]; // YYYYMMDDhhmm 추출
  const formattedTime = `${dateTime.slice(0, 4)}-${dateTime.slice(4, 6)}-${dateTime.slice(6, 8)}T${dateTime.slice(8, 10)}:${dateTime.slice(10, 12)}`;
  const date = new Date(formattedTime);
  const now = new Date();
  return (now.getTime() - date.getTime() + over)/1000;
}

async function loadlistup(e, over) {
  const data = await callData();
  const postIds = (data.list || []).reverse();
  const like_rate = (postIds.sort((a, b) => 
    (((data[b].heart.heart.length+data[b].heart.temporarily+1)**e)/timerate(b, over)) - (((data[a].heart.heart.length+data[a].heart.temporarily+1)**e)/timerate(a, over))
  ))
  //console.log(like_rate)
  return like_rate;
}

bestPosts()
loadPosts(5)
let list_up

async function best_heart_button(e) {
  let realheart = (e.classList[1]).split('best')[0]
  const likeCountElement = document.querySelector(`.${e.classList[1]}.heart_count`);
  const likeImgElement = document.querySelector(`.heart_button.${e.classList[1]}`);
    
  let like_count = Number(likeCountElement.textContent);
  let like_img = likeImgElement.src;
    
  if (like_img.includes("heart-none.webp")) {
    likeImgElement.src = `esset/${await getHeartImage(open_theme)}`
    likeCountElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
    // 게시글 ID를 list 배열에 추가
    await DB.collection('Community').doc(open_lounge).update({
      [`${realheart}.heart.heart`]: firebase.firestore.FieldValue.arrayUnion(user_IP)
        });
    } else if (like_img.includes(`heart-full`)) {
        likeImgElement.src = "esset/heart-none.webp";
        likeCountElement.style.color = "black";
        // 게시글 ID를 list 배열에 추가
        await DB.collection('Community').doc(open_lounge).update({
          [`${realheart}.heart.heart`]: firebase.firestore.FieldValue.arrayRemove(user_IP)
        });
    }

    const data = await callData();
    console.log(data[realheart].heart)

    // 업데이트된 좋아요 개수 적용
    likeCountElement.textContent = data[realheart].heart.heart.length + data[realheart].heart.temporarily;
}

async function bestPosts() {
  const postsContainer = document.getElementById('best_community_media');
  const like_rate = await loadlistup(1.8, 10800000);
  const best = like_rate.slice(0, 2);
  await PostGenerator(best, postsContainer, 0);

  // 하트 버튼 이벤트 설정
  const heartButtons = postsContainer.querySelectorAll('.heart_button');
  heartButtons.forEach(button => {
    button.onclick = null
    button.classList.value = `${button.classList.value}best`
  });

  // 하트 버튼 이벤트 설정
  const heartCount = postsContainer.querySelectorAll('.heart_count');
  heartCount.forEach(button => {
    button.onclick = null
    button.classList.value = `${button.classList.value}best`
  });

  // 하트 버튼 클릭 이벤트 처리
  postsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('heart_button')) {
      best_heart_button(event.target);
    }
  });


    // 이미지 클릭 이벤트 위임 설정 (popup-image 클래스만 대상)
    postsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('popup-image')) { // 특정 클래스가 있는지 확인
        const imgUrl = event.target.getAttribute('data-url'); // 데이터 속성에서 URL 가져오기
        console.log("Image clicked, URL:", imgUrl);
        openPopup(imgUrl);
      }
    });
}

let call_checker = false

async function loadPosts(e) {
  const postsContainer = document.getElementById('Community_content_section');
  const data = await callData();
  if (call_checker == true) {
    console.log('이미 불러옴')
  } else {
    postsContainer.innerHTML = ''
    const postIds = (data.list || []).reverse();
    list_up = postIds
    call_checker = true
  }


  await PostGenerator(list_up.splice(0,e), postsContainer);

  // 이미지 클릭 이벤트 위임 설정 (popup-image 클래스만 대상)
  postsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup-image')) { // 특정 클래스가 있는지 확인
      const imgUrl = event.target.getAttribute('data-url'); // 데이터 속성에서 URL 가져오기
      console.log("Image clicked, URL:", imgUrl);
      openPopup(imgUrl);
    }
  });
}

async function PostGenerator(postIds, container, element) {
  const data = await callData();
  try {
  for (const postId of postIds) {
    
      const post = data[postId];
      const postElement = document.createElement('div');
      postElement.classList.add('community_media_style');

      // console.log(((post.heart.heart.length+post.heart.temporarily)**1.8)/timerate(postId, 10800000))

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
      contentElement.innerText = post.content;
      contentElement.classList.add('black');
      postElement.appendChild(contentElement);

      // 이미지 추가
      const imagesContainer = document.createElement('div');
      imagesContainer.classList.add('photo-grid'); // CSS Grid 스타일을 적용할 클래스 추가
      imagesContainer.style.cssText = "margin-top: 15px";
      
      
      // 각 이미지를 비동기적으로 가져와 추가
      for (const imgPath of post.img) {
          try {
              const url = await STORAGE.ref().child(imgPath).getDownloadURL();
              const img = document.createElement('img');
              img.src = url;
              img.style.cssText = "width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px;";
              img.setAttribute('data-url', url); // 데이터 속성에 URL 저장
              img.classList.add('popup-image'); // 특정 클래스 추가

              imagesContainer.appendChild(img);
          } catch (error) {
              console.error("Error fetching image URL for path:", imgPath, error);
          }
        }
        imagesContainer.setAttribute('data-count', post.img.length);
        postElement.appendChild(imagesContainer);

        var heartcount
        var commentcount = 0
        var heart_condition
        try {heartcount = post.heart.temporarily+post.heart.heart.length} catch {heartcount = post.heart}
        try {commentcount = post.comment.length} catch {commentcount = 0}
        try {
            if (post.heart.heart.includes(user_IP)) {heart_condition = [await getHeartImage(open_theme), "var(--main-color);"]
            } else {heart_condition = ["heart-none.webp", "black"]}
          } catch {heart_condition = ["heart-none.webp", "black"]}
        // 좋아요 버튼 추가
        if (element == 1 || element == null) {
        postElement.innerHTML += `
            <div class="heart_btn_box ${postId}" >
                <img class="heart_button ${postId}" src="esset/${heart_condition[0]}" alt="좋아요 버튼" style="width: 22px; height: 22px;" onclick="click_the_button('${postId}')">
                <p class="heart_count black ${postId}" style="font-size: 18px; margin: 0; margin-left: 8px; margin-right: 16px; color: ${heart_condition[1]};">${heartcount}</p>
                <img class="heart_button" src="esset/comment.webp" alt="좋아요 버튼" style="width: 22px; height: 22px;" onclick="commentWriteButton('${postId}')">
                <p class="heart_count black" style="font-size: 18px; margin: 0; margin-left: 8px; margin-right: 16px;">${commentcount}</p>
                <img class="heart_button" src="esset/share.webp" alt="공유 버튼" style="width: 22px; height: 22px;" onclick="share_button('${postId}')">
            </div>
        `;
        } else {
        postElement.innerHTML += `
          <div class="heart_btn_box ${postId}" >
              <img class="heart_button ${postId}" src="esset/${heart_condition[0]}" alt="좋아요 버튼" style="width: 22px; height: 22px;" onclick="click_the_button('${postId}')">
              <p class="heart_count black ${postId}" style="font-size: 18px; margin: 0; margin-left: 8px; margin-right: 16px; color: ${heart_condition[1]};">${heartcount}</p>
          </div>
      `;
        }

      container.appendChild(postElement);
        
  }} finally {
    scroll_function = false
  }
}



const submitButton = document.getElementById('submitButton')

async function commentWriteButton(key) {
  openWriteSection()
  document.getElementById('top_btn').onclick = function() {closeCommentButton();};
  document.getElementById('Community_comment_section').style.display = "block"
  document.getElementById('comment_section').style.display = "block"
  loadComment(key);

  submitButton.innerText = "댓글 남기기";
  submitButton.onclick = function() {submitComment(key);};
  
  const data = await callData();
  console.log(key)
  // postId에서 날짜와 시간 추출 및 포맷팅
  const dateTime = key.match(/z(\d{12})a/)[1]; // YYYYMMDDhhmm 추출
  const formattedTime = `${dateTime.slice(0, 4)}. ${dateTime.slice(4, 6)}. ${dateTime.slice(6, 8)}. ${dateTime.slice(8, 10)}:${dateTime.slice(10, 12)}`;

  document.getElementById('nickname_value').innerText = data[key].nickname
  document.getElementById('time_value').innerText = formattedTime
  document.getElementById('content_value').textContent = data[key].content
  var heartcount
  var commentcount = 0
  var heart_condition
  try {heartcount = data[key].heart.temporarily+data[key].heart.heart.length} catch {heartcount = data[key].heart}
  try {commentcount = data[key].comment.length} catch {commentcount = 0}
  
  try {
      if (data[key].heart.heart.includes(user_IP)) {heart_condition = [await getHeartImage(open_theme), "var(--main-color);"]
      } else {heart_condition = ["heart-none.webp", "black"]}
    } catch {heart_condition = ["heart-none.webp", "black"]}
  // 좋아요 버튼 추가
  
  document.getElementById('heart_box').innerHTML = `
      <div id="heart_box" class="heart_btn_box ${key}" >
          <img class="heart_button ${key}" src="esset/${heart_condition[0]}" alt="좋아요 버튼" style="width: 22px; height: 22px;" onclick="click_the_button('${key}')">
          <p class="heart_count black ${key}" style="font-size: 18px; margin: 0; margin-left: 8px; margin-right: 16px; color: ${heart_condition[1]};">${heartcount}</p>
          <img class="heart_button" src="esset/comment.webp" alt="댓글 버튼" style="width: 22px; height: 22px;">
          <p class="heart_count black" style="font-size: 18px; margin: 0; margin-left: 8px; margin-right: 16px;">${commentcount}</p>
          <img class="heart_button" src="esset/share.webp" alt="공유 버튼" style="width: 22px; height: 22px;" onclick="share_button('${key}')">
      </div>
  `;
  

  // 이미지 추가
  const imagesContainer = document.getElementById('photo_value');
  imagesContainer.style.cssText = "margin-top: 15px";
  imagesContainer.innerHTML = ""

  const imageElements = []; // 이미지를 담을 배
  
  // 각 이미지를 비동기적으로 가져와 추가
  for (const imgPath of data[key].img) {
      try {
          const url = await STORAGE.ref().child(imgPath).getDownloadURL();
          const img = document.createElement('img');
          img.src = url;
          img.style.cssText = "width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px;";
          img.setAttribute('data-url', url); // 데이터 속성에 URL 저장
          img.classList.add('popup-image'); // 특정 클래스 추가

          imageElements.push(img); // 이미지 요소를 배열에 추가
      } catch (error) {
          console.error("Error fetching image URL for path:", imgPath, error);
      }
  }

  // 배열에 담긴 모든 이미지를 한 번에 DOM에 추가
  imagesContainer.append(...imageElements);
  imagesContainer.setAttribute('data-count', data[key].img.length);
  // postElement.appendChild(imagesContainer);
  
}

async function closeCommentButton() {
  document.getElementById('comment_section').style.display = "none"
  closeWriteSecton()
  document.getElementById('Community_comment_section').style.display = "none"
  document.getElementById('heart_box').innerHTML = `<div id='heart_box'></div>`
  
  submitButton.innerText = "글쓰기";
  submitButton.onclick = function() {submitPost();};
  document.getElementById('top_btn').onclick = function() {closeSection('Community_section');};
}

async function submitPost() {
  const nickname = document.getElementById('nickname').value;
  const content = document.getElementById('content').value;
  const files = selectedFiles;
  const postId = getCurrentFormattedTime();
  let imgUrls = [];

  if (!nickname || !content) {
    alert("닉네임과 내용을 입력하세요.");
    return;
  }

  submitButton.disabled = true;
  submitButton.innerText = "업로드 중...";

  const randomString = generateRandomString();

  try {
    // IP 주소 가져오기
    const userIP = user_IP;

    // Storage에 이미지 업로드
    for (let i = 0; i < files.length && i < 10; i++) {
      const webpFile = await convertImageToWebP(files[i]);
      const fileRef = STORAGE.ref().child(`community/${open_lounge}/${postId + randomString}_${i + 1}`);
      await fileRef.put(webpFile);
      imgUrls.push(`community/${open_lounge}/${postId + randomString}_${i + 1}`);
    }

    // Firestore에 게시글 정보 저장
    await DB.collection('Community').doc(open_lounge).set({
      [postId + randomString]: {
        nickname: nickname,
        content: content,
        img: imgUrls,
        ip: userIP, // IP 주소 추가
        heart: { heart: [], temporarily: 0 }
      }
    }, { merge: true });

    // 게시글 ID를 list 배열에 추가
    await DB.collection('Community').doc(open_lounge).update({
      list: firebase.firestore.FieldValue.arrayUnion(postId + randomString)
    });

    alert("글이 성공적으로 저장되었습니다.");
    call_checker = false;
    loadPosts(); // 새로 저장된 글 표시
    closeWriteSecton();

  } catch (error) {
    console.error("업로드 중 에러 발생:", error);
    alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
  } finally {
    // 버튼 활성화 및 원래 텍스트 복원
    submitButton.disabled = false;
    submitButton.innerText = "글쓰기";
    document.getElementById('nickname').value = "";
    document.getElementById('content').value = "";
    selectedFiles = [];
    document.getElementById('preview-section').innerHTML = "";
    updateUI();
  }
}

async function convertImageToWebP(file) {
  const fileType = file.type;

  // GIF 또는 동영상 파일은 변환하지 않음
  if (fileType === 'image/gif' || fileType.startsWith('video/')) {
    console.log('GIF 또는 동영상은 변환하지 않습니다.');
    return file;
  }

  // 나머지 이미지만 WebP로 변환
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const webpDataURL = canvas.toDataURL('image/webp', 0.9);
        fetch(webpDataURL)
          .then(res => res.blob())
          .then(resolve)
          .catch(reject);
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}



async function submitComment(key) {
  const nickname = document.getElementById('nickname').value;
  const content = document.getElementById('content').value;
  const files = selectedFiles;
  const postId = getCurrentFormattedTime();
  const randomString = generateRandomString();
  const userIP = user_IP;
  let imgUrls = [];

  if (!nickname || !content) {
    alert("닉네임과 내용을 입력하세요.");
    return;
  }

  submitButton.disabled = true;
  submitButton.innerText = "업로드 중...";
  
  try {
  // Storage에 이미지 업로드
  for (let i = 0; i < files.length && i < 10; i++) {
    const fileRef = STORAGE.ref().child(`community/${open_lounge}/${postId+randomString}_${i + 1}.png`);
    await fileRef.put(files[i]);
    const downloadURL = await fileRef.getDownloadURL();
    imgUrls.push(`community/${open_lounge}/${postId+randomString}_${i + 1}.png`);
  }

  // Firestore에 게시글 정보 저장
  await DB.collection('Community').doc(open_lounge).set({
    [postId+randomString]: {
      nickname: nickname,
      content: content,
      img: imgUrls,
      ip: userIP, // IP 주소 추가
      heart: {heart:[], temporarily:0}
    }
  }, { merge: true });

  // 게시글 ID를 list 배열에 추가
  await DB.collection('Community').doc(open_lounge).update({
    [`${key}.comment`]: firebase.firestore.FieldValue.arrayUnion(postId+randomString)
  });

  alert("댓글이 성공적으로 저장되었습니다.");

} catch (error) {
  console.error("업로드 중 에러 발생:", error);
  alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
} finally {
  // 버튼 활성화 및 원래 텍스트 복원
  submitButton.disabled = false;
  submitButton.innerText = "댓글 남기기";
  commentWriteButton(key);

  document.getElementById('nickname').value = ""
  document.getElementById('content').value = ""
  selectedFiles = [];
  document.getElementById('preview-section').innerHTML = ""
  updateUI();
}
}

async function loadComment(key) {
  const postsContainer = document.getElementById('Community_comment_section');
  postsContainer.innerHTML = ''; // 기존 게시글 초기화

  const data = await callData();
  const postIds = (data[key].comment || []).reverse();

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
      imagesContainer.classList.add('photo-grid'); // CSS Grid 스타일을 적용할 클래스 추가
      imagesContainer.style.cssText = "margin-top: 15px";
      
      
      // 각 이미지를 비동기적으로 가져와 추가
      for (const imgPath of post.img) {
          try {
              const url = await STORAGE.ref().child(imgPath).getDownloadURL();
              const img = document.createElement('img');
              img.src = url;
              img.style.cssText = "width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px;";
              img.setAttribute('data-url', url); // 데이터 속성에 URL 저장
              img.classList.add('popup-image'); // 특정 클래스 추가

              imagesContainer.appendChild(img);
          } catch (error) {
              console.error("Error fetching image URL for path:", imgPath, error);
          }
      }
      imagesContainer.setAttribute('data-count', post.img.length);
      postElement.appendChild(imagesContainer);

      var heartcount
      var heart_condition
      try {heartcount = post.heart.temporarily+post.heart.heart.length} catch {heartcount = post.heart}
      try {
          if (post.heart.heart.includes(user_IP)) {heart_condition = [await getHeartImage(open_theme), "var(--main-color);"]
          } else {heart_condition = ["heart-none.webp", "black"]}
        } catch {heart_condition = ["heart-none.webp", "black"]}
      // 좋아요 버튼 추가
      postElement.innerHTML += `
          <div class="heart_btn_box ${postId}" >
              <img class="heart_button ${postId}" src="esset/${heart_condition[0]}" alt="좋아요 버튼" style="width: 22px; height: 22px;" onclick="click_the_button('${postId}')">
              <p class="heart_count black ${postId}" style="font-size: 18px; margin: 0; margin-left: 8px; margin-right: 16px; color: ${heart_condition[1]};">${heartcount}</p>
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