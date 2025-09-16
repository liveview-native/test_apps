from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import render_to_string
import time

@csrf_exempt
def index(request):
    # Initialize session if needed
    if 'start_time' not in request.session:
        request.session['start_time'] = time.time()
    
    accept_header = request.META.get('HTTP_ACCEPT', '')
    
    if 'application/swiftui+vml' in accept_header:
        # Render VML template
        content = render_to_string('counter/index.vml')
        return HttpResponse(content, content_type='application/swiftui+vml')
    else:
        # Render HTML template with context
        elapsed = int(time.time() - request.session.get('start_time', time.time()))
        context = {
            'initial_counter': elapsed
        }
        return render(request, 'counter/index.html', context)

@csrf_exempt  
def counter(request):
    # Initialize session if needed
    if 'start_time' not in request.session:
        request.session['start_time'] = time.time()
    
    elapsed = int(time.time() - request.session.get('start_time', time.time()))
    
    accept_header = request.META.get('HTTP_ACCEPT', '')
    
    if 'application/swiftui+vml' in accept_header:
        content = f'<text>{elapsed}</text>'
        return HttpResponse(content, content_type='application/swiftui+vml')
    else:
        return HttpResponse(str(elapsed), content_type='text/html')
