const posts = document.getElementById('posts');
const spinner = document.getElementById('spinner');
const loadMoreBtn = document.getElementById('load-more');
const endBlock = document.getElementById('end-block');

let num_posts = 10;


const getData = () => {
    $.ajax({
        type: 'GET',
        url: `/get-quests/${num_posts}`,
        success: function(response) {
            console.log(response['data']);
            const data = response['data'];
            data.forEach(el => {
                posts.innerHTML += quest_list(el.id, el.user_img, el.author_id, el.author, el.content, el.created, el.answers)
            });
            spinner.classList.add('not-visible');
            spinner.classList.remove('d-flex');
            if(num_posts >= response.length) {
                loadMoreBtn.classList.add('not-visible');
                endBlock.textContent = 'No more questions to load';
                endBlock.classList.remove('not-visible');
                endBlock.classList.add('d-block');
            }
            num_posts += 10;
            AnswerQuestion(); 
        },
        error: function(response) {
            console.log(response)
        }
    })

}


getData();

loadMoreBtn.addEventListener('click', () => {
    spinner.classList.remove('not-visible');
    spinner.classList.add('d-flex');
    getData();
})

