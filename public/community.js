async function click_the_button(e) {
    console.log(e);
    const likeCountElement = document.querySelector(`.${e}.heart_count`);
    const likeImgElement = document.querySelector(`.heart_button.${e}`);
    
    let like_count = Number(likeCountElement.textContent);
    let like_img = likeImgElement.src;
    
    if (like_img.includes("heart-none.webp")) {
        likeImgElement.src = "esset/heart-full.webp";
        likeCountElement.style.color = "blueviolet";
        like_count += 1;
        // 게시글 ID를 list 배열에 추가
        await DB.collection('Community').doc('temporarily').update({
          [`${e}.heart.heart`]: firebase.firestore.FieldValue.arrayUnion(user_IP)
        });
    } else if (like_img.includes("heart-full.webp")) {
        likeImgElement.src = "esset/heart-none.webp";
        likeCountElement.style.color = "black";
        like_count -= 1;
        // 게시글 ID를 list 배열에 추가
        await DB.collection('Community').doc('temporarily').update({
          [`${e}.heart.heart`]: firebase.firestore.FieldValue.arrayRemove(user_IP)
        });
    }

    const doc = await DB.collection('Community').doc('temporarily').get();
    const data = doc.data();
    console.log(data[e].heart)

    // 업데이트된 좋아요 개수 적용
    likeCountElement.textContent = data[e].heart.heart.length + data[e].heart.temporarily;
}

const selectedFiles = []; // 업로드된 모든 파일을 관리할 배열
const MAX_FILES = 9; // 최대 파일 개수

// 비동기적으로 FileReader 작업을 처리하는 함수
function readFileAsDataURL(file) {
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
function removeImage(index) {
    selectedFiles.splice(index, 1); // 배열에서 제거
    updateUI();
    renderPreviews();
  }

// 이미지 미리보기 렌더링 함수
async function renderPreviews() {
  const previewSection = document.getElementById('preview-section');
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
}

// 파일 선택 이벤트 처리 함수
function handleFileSelection(event) {
    const files = event.target.files;
  
    // 현재 파일 개수와 새로 추가될 파일 개수 확인
    if (selectedFiles.length + files.length > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개 파일만 업로드할 수 있습니다.`);
      return;
    }
  
    // 파일 추가
    Array.from(files).forEach((file) => {
      selectedFiles.push(file);
    });
  
    updateUI();
    renderPreviews();
  }
  
  // UI 업데이트 함수
  function updateUI() {
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

// 초기 파일 선택 이벤트 연결
document.getElementById('images').addEventListener('change', handleFileSelection);

// 추가 업로드 버튼에 파일 선택 이벤트 연결
document.getElementById('extra-images').addEventListener('change', handleFileSelection);

    // 전역 변수 선언
    let user_IP = '';

    // IP 가져오기
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        // 전역 변수에 IP 저장
        // console.log('Your IP:', user_IP); // 확인용 로그
        // XOR 적용
        const xorTransformed = xorTransform(data.ip);

        // Base64 인코딩
        const encodedData = btoa(xorTransformed);

        console.log(":", encodedData);
        user_IP = encodedData; 
      })
      .catch(error => {
        console.error('Error fetching IP:', error);
      });

// XOR 키
const key = 75;

// // 실제 IP와 가짜 IP 결합
// const combinedIp = `REAL:${realIp}|FAKE:${fakeIp}`;

// XOR 변환 함수
async function xorTransform(data) {
  const doc = await DB.collection('Community').doc('temporarily').get();
  const sec_dt = doc.data();

    let transformed = '';
    for (let i = 0; i < data.length; i++) {
        transformed += String.fromCharCode(data.charCodeAt(i) ^ sec_dt['sec']);
    }
    return transformed;
}

function openWriteSection() {
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
          if (post.heart.heart.includes(user_IP)) {heart_condition = ["heart-full.webp", "blueviolet"]
          } else {heart_condition = ["heart-none.webp", "black"]}
        } catch {heart_condition = ["heart-none.webp", "black"]}
      // 좋아요 버튼 추가
      postElement.innerHTML += `
          <div class="heart_btn_box ${postId}" onclick="click_the_button('${postId}')">
              <img class="heart_button ${postId}" src="esset/${heart_condition[0]}" alt="좋아요 버튼" style="width: 22px; height: 22px;">
              <p class="heart_count black ${postId}" style="font-size: 18px; margin: 0; margin-left: 8px; color: ${heart_condition[1]};">${heartcount}</p>
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

  function generateRandomString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  // 사용 예시
  const randomString = generateRandomString();

  // Storage에 이미지 업로드
  for (let i = 0; i < files.length && i < 10; i++) {
    const fileRef = storage.ref().child(`community/temporarily/${postId+randomString}_${i + 1}.png`);
    await fileRef.put(files[i]);
    const downloadURL = await fileRef.getDownloadURL();
    imgUrls.push(`community/temporarily/${postId+randomString}_${i + 1}.png`);
  }

    // IP 주소 가져오기
const userIP = user_IP;

  // Firestore에 게시글 정보 저장
  await DB.collection('Community').doc('temporarily').set({
    [postId+randomString]: {
      nickname: nickname,
      content: content,
      img: imgUrls,
      ip: userIP, // IP 주소 추가
      heart: {heart:[], temporarily:0}
    }
  }, { merge: true });

  // 게시글 ID를 list 배열에 추가
  await DB.collection('Community').doc('temporarily').update({
    list: firebase.firestore.FieldValue.arrayUnion(postId+randomString)
  });

  alert("글이 성공적으로 저장되었습니다.");
  loadPosts(); // 새로 저장된 글 표시
  closeWriteSecton();
}