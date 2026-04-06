function getTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// Base64로 파일 인코딩하는 함수
async function convertFileToBase64(file) {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);  // base64만 반환
    reader.onerror = reject;
    reader.readAsDataURL(file);
});
}
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("submitBtn").addEventListener("click", async () => {

const data = {
name: document.getElementById("namespace").value,

nationality: document.querySelectorAll(".rank2input")[1].value,

sector: document.querySelector("select[name='sector']").value,
gender: document.querySelector("select[name='gender']").value,

height: document.querySelectorAll(".rank2input")[2].value,
weight: document.querySelectorAll(".rank2input")[3].value,

birth: {
    year: document.querySelector("select[name='YYYY']").value,
    month: document.querySelector("select[name='MM']").value,
    day: document.querySelector("select[name='DD']").value
},

email: document.querySelectorAll(".rank2input")[4].value,
phone: document.querySelectorAll(".rank2input")[5].value,

address: document.querySelector(".rank1box").value,
experience: document.getElementById("experience").value,

photos: photoData, // 이미 변수 있음
video: document.getElementById("videoInput").files[0],

agree: document.getElementById("agreeCheck").checked
};
if (
data.agree != true 
|| data.name == "" 
|| data.nationality == "" 
|| data.sector == "" 
|| data.gender == "" 
|| data.height == "" 
|| data.weight == "" 
|| data.birth.year == "" 
|| data.birth.month == "" 
|| data.birth.day == ""
|| data.email == ""
|| data.phone == ""
|| data.address == ""
|| data.photos.front == undefined
|| data.photos.full == undefined
|| data.photos.left == undefined
|| data.photos.right == undefined
|| data.video == undefined
) {
if (data.agree != true) {
    document.getElementById("openTerms").style.color = "#e71212"
}
if (data.name == "") {
    document.getElementById("namespace").classList.add("red-placeholder");
}
if (data.nationality == "") {
    document.querySelectorAll(".rank2input")[1].classList.add("red-placeholder")
}
if (data.sector == "") {
    document.querySelector("select[name='sector']").style.color = "#e71212"
}
if (data.gender == "") {
    document.querySelector("select[name='gender']").style.color = "#e71212"
}
if (data.height == "") {
    document.querySelectorAll(".rank2input")[2].classList.add("red-placeholder")
}
if (data.weight == "") {
    document.querySelectorAll(".rank2input")[3].classList.add("red-placeholder")
}
if (data.birth.year == "") {
    document.querySelector("select[name='YYYY']").style.color = "#e71212"
}
if (data.birth.month == "") {
    document.querySelector("select[name='MM']").style.color = "#e71212"
}
if (data.birth.day == "") {
    document.querySelector("select[name='DD']").style.color = "#e71212"
}
if (data.email == "") {
    document.querySelectorAll(".rank2input")[4].classList.add("red-placeholder")
}
if (data.phone == "") {
    document.querySelectorAll(".rank2input")[5].classList.add("red-placeholder")
}
if (data.address == "") {
    document.querySelector(".rank1box").classList.add("red-placeholder")
}
if (data.photos.front == undefined || data.photos.full == undefined || data.photos.left == undefined || data.photos.right == undefined) {
    document.querySelectorAll(".photo-box")[0].style.color = "#e71212"
    document.querySelectorAll(".photo-box")[1].style.color = "#e71212"
    document.querySelectorAll(".photo-box")[2].style.color = "#e71212"
    document.querySelectorAll(".photo-box")[3].style.color = "#e71212"
}
if (data.video == undefined) {
    document.getElementById("videoInputLabel").style.color = "#e71212"
}
alert("입력하지 않은 칸이 있습니다.")
}
console.log("지원 데이터:", data);

await fetch("https://submitinfo-eno2n4pmqq-uc.a.run.app", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({ 
        name: data.name,
        nationality: data.nationality,
        sector: data.sector,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        birth: data.birth.year+". "+data.birth.month+". "+data.birth.day+". ",
        contact: [data.email, data.phone, data.address],
        experience: data.experience,
        photosURL: "test",
        videoURL: "test",
        nowTime: getTimestamp()
    }),
  });
  let imgUrls = [];
  const IMGarray = [];

  for (let i = 0; i < Object.keys(data.photos).length && i < 4; i++) {
    // 웹P 파일을 Base64로 인코딩
    const file = Object.values(data.photos)[i];
    const extension = file.name.split('.').pop();
    const base64File = await convertFileToBase64(Object.values(data.photos)[i]);
    
    IMGarray.push(base64File)
    imgUrls.push(`audition/${data.birth.year+". "+data.birth.month+". "+data.birth.day+". "}_${getTimestamp()}/${i + 1}.${extension}`);

    // await fetch("https://submitimgs-eno2n4pmqq-uc.a.run.app", {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json",},
    //   body: JSON.stringify({ 
    //     filePath: `community/${open_lounge}/${postId + randomString}_${i + 1}`, 
    //     file: base64File, 
    //   }),
    // });
  }

  await fetch("https://submitauditionimgs-eno2n4pmqq-uc.a.run.app", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({ 
      roop: Object.keys(data.photos).length,
      filePath: imgUrls, 
      file: IMGarray, 
    }),
  });

  const videoExtension = data.video.name.split(".").pop()
  const videoUrls = `audition/${data.birth.year+". "+data.birth.month+". "+data.birth.day+". "}_${getTimestamp()}/video.${videoExtension}`

  await fetch("https://submitauditionvideo-eno2n4pmqq-uc.a.run.app", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({ 
      filePath: videoUrls, 
      file: data.video, 
    }),
  });

});
});