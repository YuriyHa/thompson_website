from django import forms
from .models import Post, Question, Vote

class NewPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['post_img', 'content']

    def __init__(self, *args, **kwargs):
        super(forms.ModelForm, self).__init__(*args, **kwargs)

        self.fields['post_img'].widget.attrs['class'] = 'form-control mb-2'
        self.fields['content'].widget.attrs['class'] = 'form-control mb-2'
        self.fields['content'].widget.attrs['placeholder'] = 'Post Content'

class NewQuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = [ 'content']

    def __init__(self, *args, **kwargs):
        super(forms.ModelForm, self).__init__(*args, **kwargs)

        self.fields['content'].widget.attrs['class'] = 'form-control mb-2'
        self.fields['content'].widget.attrs['placeholder'] = 'Question Content'

