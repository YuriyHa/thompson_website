const alertBox = document.getElementsByClassName('alert');

setTimeout(() => {
    [...alertBox].forEach(el => {
        el.classList.add('not-visible')
    });
}, 4000)

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikePosts = () => {
    const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-form')];
    likeUnlikeForms.forEach(form => form.addEventListener('click', e => {
        e.preventDefault();
        const clickId = form.getAttribute('form-like-id');
        const clickedBtn = document.getElementById(`like-unlike-${clickId}`);

        $.ajax({
            type: 'POST',
            url: '/like-unlike/',
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickId
            },
            success: function(response) {
                console.log(response);
                document.getElementById(`likes-${clickId}`).textContent = response.count;
                document.getElementById(`likes-${clickId}`).textContent = response.count;
                if(response.liked) {
                    clickedBtn.innerHTML = `<img src="https://www.svgrepo.com/show/139967/like.svg" intrinsicsize="512 x 512" width="30" height="30" srcset="https://www.svgrepo.com/show/139967/like.svg 4x" alt="Like SVG Vector" title="Like SVG Vector">`;
                }else {
                    clickedBtn.innerHTML = `<img src="https://www.svgrepo.com/show/177816/like-hands.svg" intrinsicsize="512 x 512" width="30" height="30" srcset="https://www.svgrepo.com/show/177816/like-hands.svg 4x" alt="Like Hands SVG Vector" title="Like Hands SVG Vector">`;
                }
            },
            error: function(response) {
                console.log(response)
            }
        })
    }))
}

const AnswerQuestion = () => {
    const likeUnlikeForms = [...document.getElementsByClassName('answer-form')];
    likeUnlikeForms.forEach(form => form.addEventListener('click', e => {
        e.preventDefault();
        const clickId = form.getAttribute('form-quest-id');
        const clickedBtn = document.getElementById(`ans-${clickId}`);

        angry_id = form.getAttribute(`andry-form-id`);
        angry_button = document.getElementById(`ans-${angry_id}`);

        $.ajax({
            type: 'POST',
            url: '/answer/',
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickId
            },
            success: function(response) {
                console.log(response);
                // document.getElementById(`answs-${clickId}`).textContent = response.count;
                if(response.liked) {
                    clickedBtn.classList.add('btn-primary');
                    angry_button.classList.remove('btn-primary'); 

                }else {
                    clickedBtn.classList.remove('btn-primary'); 
                }
            },
            error: function(response) {
                console.log(response);
            }
        })
    }))
}


const post_list = (id, user_img, author_id, img, liked, likes, author, no_of_comments, content, created) => {
    return `
        <div class="card">
            <div class="card-profile p-2">
                <div>
                    <img src="${user_img}" class="home-profile-pic" />
                </div>
                <div>
                    <a href="/u/profile/${author_id}/" class="text-dark">
                        <h6 class="d-inline">${author}</h6>
                    </a>
                </div>
            </div>
            <a href="/post/${id}">
                <img class="card-img-top" src="${img}" alt="Card image cap"/>
            </a>
            <div class="card-body">
                <div className="btns">
                    <form class="d-inline like-unlike-form" form-like-id=${id}>
                        <button class="border-0 pl-2 pr-2 btn" id="like-unlike-${id}" >${liked ? `<img src="https://www.svgrepo.com/show/177816/like-hands.svg" intrinsicsize="512 x 512" width="30" height="30" srcset="https://www.svgrepo.com/show/177816/like-hands.svg 4x" alt="Like Hands SVG Vector" title="Like Hands SVG Vector">` :`<img src="https://www.svgrepo.com/show/139967/like.svg" intrinsicsize="512 x 512" width="30" height="30" srcset="https://www.svgrepo.com/show/139967/like.svg 4x" alt="Like SVG Vector" title="Like SVG Vector">`}</button>
                    </form>
                <p class="text-muted mb-1 mt-1 text-bold" id="likes-${id}">${likes}</p>
                </div>
                <a href="" class="text-dark">
                        <h6 class="d-inline">${author}</h6>
                </a>
                <p class="d-inline">${content}</p>
                <p class="text-muted mb-1">${created}</p>
                <a href="/post/${id}" class="text-dark" id="comments-${id}">${no_of_comments ? no_of_comments : "" }</a>
                <form class="comment-form" form-comment-id=${id}>
                    <input type="text" id="input-comment-${id}" class="form-control" placeholder="Comment" required/>
                    <button type="submit" class="btn btn-primary mt-2 w-100">Comment</button>
                </form>
            </div>
        </div>
        `
}


const quest_list = (quest_id, user_img, author_id, author, content, created, answers) => {
    return `
        <div class="card">
            <div class="card-profile p-2">
                <div>
                    <img src="${user_img}" class="home-profile-pic" />
                </div>
                <div>
                    <a href="/u/profile/${author_id}/" class="text-dark">
                        <h6 class="d-inline">${author}</h6>
                    </a>
                </div>
            </div>
            <div class="card-body m-auto">
                <p class="d-inline">${content}</p>
                <div class="m-3">
                <form class="d-inline answer-form" andry-form-id="${answers[1].answer_id}" form-quest-id=${answers[0].answer_id}>
                    <button class="border-0 pl-2 pr-2 btn  ${answers[0].answer_right?"btn-primary":""}" id="ans-${answers[0].answer_id}" >
                    ${answers[0].answer_content}</button>
                </form>
                
                <form class="d-inline answer-form" andry-form-id="${answers[0].answer_id}" form-quest-id=${answers[1].answer_id}>
                    <button class="border-0 pl-2 pr-2 btn ${answers[1].answer_right?"btn-primary":""}" id="ans-${answers[1].answer_id}" >
                    ${answers[1].answer_content}</button>
                </form>
                </div>
                <p class="text-muted mb-1">${created}</p>
            </div>
        </div>
        `
}