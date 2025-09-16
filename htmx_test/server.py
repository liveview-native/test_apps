#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import time
import uuid
import http.cookies

sessions = {}

class CounterHandler(BaseHTTPRequestHandler):
    def get_session_id(self):
        cookie_header = self.headers.get('Cookie')
        if cookie_header:
            cookie = http.cookies.SimpleCookie()
            cookie.load(cookie_header)
            if 'session_id' in cookie:
                return cookie['session_id'].value
        return None
    
    def do_GET(self):
        if self.path == '/':
            with open('index.html', 'rb') as f:
                content = f.read()
            
            session_id = self.get_session_id()
            if not session_id:
                session_id = str(uuid.uuid4())
                sessions[session_id] = time.time()
            
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Set-Cookie', f'session_id={session_id}; Path=/; HttpOnly')
            self.end_headers()
            self.wfile.write(content)
            
        elif self.path == '/counter':
            session_id = self.get_session_id()
            if not session_id:
                session_id = str(uuid.uuid4())
                sessions[session_id] = time.time()
            
            if session_id not in sessions:
                sessions[session_id] = time.time()
            
            elapsed = int(time.time() - sessions[session_id])
            counter_html = str(elapsed)
            
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', str(len(counter_html)))
            self.send_header('Set-Cookie', f'session_id={session_id}; Path=/; HttpOnly')
            self.end_headers()
            self.wfile.write(counter_html.encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def log_message(self, format, *args):
        return

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), CounterHandler)
    print('Server running at http://localhost:8000')
    print('Press Ctrl+C to stop')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped')
        server.shutdown()