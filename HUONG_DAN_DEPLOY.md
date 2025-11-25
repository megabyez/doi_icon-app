# 📚 Hướng dẫn Deploy lên GitHub Pages với Custom Domain

## Bước 1: Tạo Repository trên GitHub

1. Đăng nhập vào [GitHub](https://github.com)
2. Click nút **"New"** hoặc **"+"** → **"New repository"**
3. Đặt tên repository (ví dụ: `doi-icon-app`)
4. Chọn **Public** (để dùng GitHub Pages miễn phí)
5. **KHÔNG** tích vào "Initialize with README" (vì bạn đã có files)
6. Click **"Create repository"**

## Bước 2: Upload Files lên GitHub

### Cách 1: Sử dụng GitHub Desktop (Dễ nhất)

1. Tải [GitHub Desktop](https://desktop.github.com/)
2. Cài đặt và đăng nhập
3. File → Add Local Repository
4. Chọn thư mục chứa project của bạn
5. Commit với message: "Initial commit"
6. Publish repository

### Cách 2: Sử dụng Git Command Line

Mở Terminal/Command Prompt trong thư mục project và chạy:

```bash
# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit"

# Thêm remote repository (thay YOUR_USERNAME và YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### Cách 3: Upload trực tiếp trên GitHub

1. Vào repository vừa tạo
2. Click **"uploading an existing file"**
3. Kéo thả các file: `index.html`, `style.css`, `script.js`, `README.md`, `.gitignore`
4. Click **"Commit changes"**

## Bước 3: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click tab **"Settings"**
3. Scroll xuống phần **"Pages"** (bên trái)
4. Ở **"Source"**, chọn **"Deploy from a branch"**
5. Chọn branch **"main"** và folder **"/ (root)"**
6. Click **"Save"**
7. Đợi vài phút, GitHub sẽ tạo URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Bước 4: Cấu hình Custom Domain

### 4.1. Thêm file CNAME

1. Trong repository, click **"Add file"** → **"Create new file"**
2. Đặt tên file: `CNAME` (chữ hoa, không có extension)
3. Trong file, chỉ điền tên miền của bạn (ví dụ: `example.com` hoặc `www.example.com`)
   - **Lưu ý**: Chỉ điền tên miền, KHÔNG có `http://` hay `https://`
4. Click **"Commit new file"**

### 4.2. Cấu hình DNS ở nhà cung cấp domain

Vào phần quản lý DNS của nhà cung cấp domain (GoDaddy, Namecheap, v.v.) và thêm các record sau:

#### Nếu dùng subdomain (ví dụ: `app.example.com`):
```
Type: CNAME
Name: app (hoặc tên subdomain bạn muốn)
Value: YOUR_USERNAME.github.io
TTL: 3600 (hoặc Auto)
```

#### Nếu dùng root domain (ví dụ: `example.com`):
```
Type: A
Name: @ (hoặc để trống)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

**Lưu ý**: GitHub có thể thay đổi IP, nên kiểm tra [GitHub Pages IP addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)

#### Nếu dùng cả www và non-www:
Thêm cả 2 record:
- CNAME cho `www` → `YOUR_USERNAME.github.io`
- A records cho root domain (như trên)

### 4.3. Bật HTTPS (Tự động)

1. Sau khi DNS đã propagate (có thể mất 24-48 giờ)
2. Vào lại Settings → Pages
3. GitHub sẽ tự động cấp SSL certificate
4. Tích vào **"Enforce HTTPS"** (sau khi có certificate)

## Bước 5: Kiểm tra

1. Đợi DNS propagate (có thể mất vài giờ đến 48 giờ)
2. Truy cập tên miền của bạn
3. Kiểm tra xem app có hoạt động không

## Troubleshooting

### DNS chưa hoạt động?
- Kiểm tra DNS propagation: https://dnschecker.org
- Đảm bảo đã đợi đủ thời gian (24-48 giờ)

### HTTPS không hoạt động?
- Đợi GitHub cấp certificate (có thể mất vài giờ)
- Kiểm tra trong Settings → Pages xem có lỗi gì không

### App không hiển thị?
- Kiểm tra file `CNAME` có đúng tên miền không
- Kiểm tra GitHub Pages đã được bật chưa
- Xem Actions tab xem có lỗi build không

## Cập nhật App

Sau khi thay đổi code:

```bash
git add .
git commit -m "Update app"
git push
```

GitHub Pages sẽ tự động cập nhật sau vài phút.

