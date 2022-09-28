from django.urls import path
from .views import (
    index,
    home,
    forum,
    new_post,
    new_quest,
    get_posts,
    get_quests,
    comment_view,
    like_unlike_view,
    current_post,
    answer,
    post_delete_view,
    post_update_view,
    get_post_details,
    get_post_comments
)

urlpatterns = [
    path('home/', home, name='home'),
    path('', index, name='index'),
    path('forum/', forum, name='forum'),
    path('get-posts/<int:num_posts>', get_posts, name='get-posts'),
    path('get-quests/<int:num_posts>', get_quests, name='get-quests'),
    path('new-post/', new_post, name='new-post'),
    path('new-quest/', new_quest, name='new-quest'),
    path('post/<int:post_id>/', current_post, name='current-post'),
    path('post/delete/<int:pk>/', post_delete_view, name='delete-post'),
    path('post/update/<int:pk>/', post_update_view, name='update-post'),
    path('get-post-details/<int:pk>/', get_post_details, name='get-post-details'),
    path('get-post-comments/<int:pk>',
         get_post_comments, name='get-post-comments'),
    path('like-unlike/', like_unlike_view, name='like-unlike'),
    path('answer/', answer, name='answer'),
    path('comment/', comment_view, name='comment'),
]
