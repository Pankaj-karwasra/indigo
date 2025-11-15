from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import views,status,generics,viewsets
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *

# Registration View
class RegisterView(generics.CreateAPIView):
    queryset = UserRegister.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer) 
        headers = self.get_success_headers(serializer.data)

        return Response(
            {
                "status": "success",
                "response_code": status.HTTP_201_CREATED,
                "message": "User registered successfully.",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def perform_create(self, serializer):
        serializer.save()

#Login
class LoginView(views.APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    authentication_classes = []
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            return Response(
                {
                    "status": "success",
                    "response_code": status.HTTP_200_OK,
                    "message": "User logged in successfully.",
                    "data": serializer.validated_data
                },
                status=status.HTTP_200_OK
            )

        except serializers.ValidationError as e:
            return Response(
                {
                    "status": "failed",
                    "response_code": status.HTTP_401_UNAUTHORIZED,
                    "message": "Authentication failed. Please check your credentials.",
                    "errors": e.detail
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
        


# Service ViewSet
class ServiceViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Service.objects.all()
        serializer = ServiceSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        service = get_object_or_404(Service, pk=pk)
        serializer = ServiceSerializer(service, context={"request": request})
        return Response(serializer.data)

    def create(self, request):
        serializer = ServiceSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        service = get_object_or_404(Service, pk=pk)
        serializer = ServiceSerializer(service, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        service = get_object_or_404(Service, pk=pk)
        service.delete()
        return Response({"message": "Service deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        


# Testimonial ViewSet
class TestimonialViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Testimonial.objects.all()
        serializer = TestimonialSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(Testimonial, pk=pk)
        serializer = TestimonialSerializer(obj, context={"request": request})
        return Response(serializer.data)

    def create(self, request):
        serializer = TestimonialSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        obj = get_object_or_404(Testimonial, pk=pk)
        serializer = TestimonialSerializer(obj, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        obj = get_object_or_404(Testimonial, pk=pk)
        obj.delete()
        return Response({"message": "Testimonial deleted successfully"}, status=204)



# Team ViewSet
class TeamViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Team.objects.all()
        serializer = TeamSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(Team, pk=pk)
        serializer = TeamSerializer(obj, context={"request": request})
        return Response(serializer.data)

    def create(self, request):
        serializer = TeamSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        obj = get_object_or_404(Team, pk=pk)
        serializer = TeamSerializer(obj, data=request.data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        obj = get_object_or_404(Team, pk=pk)
        obj.delete()
        return Response({"message": "Team deleted successfully"}, status=204)