from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Post
from .serializers import PostSerializer

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes=[permissions.AllowAny]
    
    def perform_create(self, serializer):
        return serializer.save()
   
    def perform_update(self, serializer):
        return serializer.save()
   
    @action(detail=True,methods=['get'])
    def details(self,request,pk=None):
        post=self.get_object()
        serializer=PostSerializer(post)
        return Response(serializer.data)
    
    
    