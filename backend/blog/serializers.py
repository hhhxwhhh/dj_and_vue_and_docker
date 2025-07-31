from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    #增强序列化容器，使其更好地处理日期格式
    created_at=serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',read_only=True)
    updated_at=serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id','created_at', 'updated_at']
