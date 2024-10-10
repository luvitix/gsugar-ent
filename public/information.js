


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
}