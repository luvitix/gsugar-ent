


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