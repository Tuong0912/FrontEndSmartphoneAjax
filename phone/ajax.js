function addNewSmartPhone() {
    //lay du lieu
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/smartphone",
        //xử lý khi thành công
        success: successHandler

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/smartphone",
        dataType: "json",
        success: function (data) {
            let context = ""
            for (let i = 0; i < data.length; i++) {
               context += `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].producer}</td>
                            <td>${data[i].model}</a></td>
                            <td>${data[i].price}</td>
                            <td><button onclick="deleteSmartphones(${data[i].id})">Delete</button></td>
                            </tr>`;
            }
            document.getElementById("display").innerHTML = context
        }
    })

}

//sư kiện nào thực hiện Ajax
function deleteSmartphones(id) {
    //lay du lieu
    // goi ajax
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/smartphone/delete/` + id,

        //xử lý khi thành công
        success: function (data) {
            successHandler()
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}
successHandler()