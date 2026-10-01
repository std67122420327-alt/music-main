from flask import Flask, send_from_directory
import os

# สร้างเซิร์ฟเวอร์ และตั้งค่าให้อ่านไฟล์จากโฟลเดอร์ปัจจุบัน
app = Flask(__name__, static_folder='.', static_url_path='')

# เมื่อมีคนเข้าเว็บหน้าแรก ให้ส่งไฟล์ index.html ไปแสดง
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    # ตั้งค่าพอร์ตสำหรับรันบน Render
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
