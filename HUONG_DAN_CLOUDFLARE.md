# 🌩️ Hướng dẫn chuyển DNS sang Cloudflare

## Bước 1: Tạo tài khoản Cloudflare

1. Vào https://dash.cloudflare.com/sign-up
2. Đăng ký tài khoản miễn phí (Free plan)
3. Xác nhận email

## Bước 2: Thêm Domain vào Cloudflare

1. Sau khi đăng nhập, click **"Add a site"**
2. Nhập domain: `megabye.io.vn`
3. Click **"Add site"**
4. Chọn plan: **Free** (đủ dùng)
5. Click **"Continue"**

## Bước 3: Cloudflare quét DNS hiện tại

1. Cloudflare sẽ tự động quét các DNS records hiện có
2. Xem lại các records đã được quét
3. Click **"Continue"**

## Bước 4: Thay đổi Nameservers

Cloudflare sẽ cung cấp 2 nameservers mới, ví dụ:
- `lars.ns.cloudflare.com`
- `meiling.ns.cloudflare.com`

### Cách thay đổi Nameservers:

#### Nếu domain ở TenTen:
1. Đăng nhập vào TenTen
2. Vào phần quản lý domain `megabye.io.vn`
3. Tìm phần **"Nameservers"** hoặc **"NS Records"**
4. Thay đổi nameservers thành 2 nameservers mà Cloudflare cung cấp
5. Lưu lại

#### Nếu domain ở nhà cung cấp khác:
- Tìm phần quản lý Nameservers
- Thay đổi thành nameservers của Cloudflare

## Bước 5: Thêm DNS Records trên Cloudflare

Sau khi nameservers đã được cập nhật (có thể mất vài phút đến vài giờ):

1. Vào Cloudflare Dashboard
2. Chọn domain `megabye.io.vn`
3. Vào tab **"DNS"** → **"Records"**
4. Xóa các A records cũ (nếu có)
5. Thêm 4 A records mới cho GitHub Pages:

```
Type: A
Name: @ (hoặc megabye.io.vn)
IPv4 address: 185.199.108.153
Proxy status: DNS only (tắt proxy - icon màu xám)
TTL: Auto

Type: A
Name: @
IPv4 address: 185.199.109.153
Proxy status: DNS only
TTL: Auto

Type: A
Name: @
IPv4 address: 185.199.110.153
Proxy status: DNS only
TTL: Auto

Type: A
Name: @
IPv4 address: 185.199.111.153
Proxy status: DNS only
TTL: Auto
```

**⚠️ QUAN TRỌNG:** Phải tắt Proxy (icon màu xám, không phải màu cam) vì GitHub Pages cần truy cập trực tiếp IP.

## Bước 6: Đợi Nameservers propagate

- Thường mất 15 phút - 2 giờ
- Kiểm tra tại: https://dnschecker.org
- Chọn record type: **NS** (Nameserver)
- Xem các server đã nhận nameservers mới chưa

## Bước 7: Kiểm tra trên GitHub

Sau khi nameservers và DNS records đã propagate:

1. Vào GitHub → Settings → Pages
2. Click **"Check again"** ở phần Custom domain
3. Lỗi DNS sẽ biến mất
4. GitHub sẽ tự động cấp SSL certificate

## Lợi ích của Cloudflare:

✅ DNS propagation nhanh hơn (vài phút - 1 giờ)  
✅ Miễn phí  
✅ Dễ quản lý DNS  
✅ Có thể bật CDN sau này (nhưng với GitHub Pages thì không cần)  
✅ Analytics và monitoring  

## Lưu ý:

- **KHÔNG** bật Proxy (orange cloud) cho A records của GitHub Pages
- Chỉ dùng **DNS only** (grey cloud)
- Nếu bật Proxy, GitHub sẽ không nhận được domain

