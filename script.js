// Hàm để phát hiện và thay thế tất cả emoji thành 🌸, và đổi ► và ▪️ thành ◼️
function replaceAllEmojis(text) {
    // Bước 1: Thay thế ► (U+25BA) thành ◼️ (U+25FC với FE0F)
    let result = text.replace(/\u{25BA}/gu, '\u{25FC}\u{FE0F}');
    
    // Bước 2: Thay thế ▪️ (U+25AA với FE0F) thành ◼️ (U+25FC với FE0F)
    result = result.replace(/\u{25AA}\u{FE0F}?/gu, '\u{25FC}\u{FE0F}');
    
    // Regex để bắt tất cả emoji, nhưng loại trừ ◼️ (U+25FC)
    // Giữ nguyên ◼️ vì đây là ký tự định dạng sau khi đổi từ ► và ▪️
    const emojiRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2190}-\u{21FF}]|[\u{2B00}-\u{2BFF}])\u{FE0F}?|([\u{25AB}-\u{25B9}]|[\u{25BB}-\u{25FB}]|[\u{25FD}-\u{25FF}])\u{FE0F}?/gu;
    
    // Kiểm tra xem có emoji trong văn bản không (trừ ◼️)
    const testRegex = /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2190}-\u{21FF}]|[\u{2B00}-\u{2BFF}])\u{FE0F}?|([\u{25AB}-\u{25B9}]|[\u{25BB}-\u{25FB}]|[\u{25FD}-\u{25FF}])\u{FE0F}?/gu;
    const hasEmoji = testRegex.test(result);
    testRegex.lastIndex = 0;
    
    if (hasEmoji) {
        // Thay thế emoji bằng 🌸, nhưng giữ nguyên ◼️ (U+25FC)
        result = result.replace(emojiRegex, (match) => {
            // Kiểm tra charCode của ký tự đầu tiên
            const firstChar = match.charCodeAt(0);
            // Giữ nguyên ◼️ (U+25FC)
            if (firstChar === 0x25FC) {
                return match; // Giữ nguyên
            }
            // Các emoji khác thay bằng 🌸
            return '🌸';
        });
    } else {
        // Kiểm tra xem văn bản có bắt đầu bằng dấu chấm, bullet point, hoặc ký tự đặc biệt không
        const trimmedText = result.trim();
        const startsWithSpecialChar = /^[.•\-*+→←↑↓▶◀▸▹▪▫○●]/u.test(trimmedText);
        
        if (startsWithSpecialChar) {
            // Nếu đã có ký tự đặc biệt ở đầu, giữ nguyên
            result = result;
        } else {
            // Chỉ thêm 🌸 nếu không có emoji và không bắt đầu bằng ký tự đặc biệt
            result = '🌸 ' + trimmedText;
        }
    }
    
    return result;
}

// Hàm hiển thị thông báo toast đẹp
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icon theo loại
    const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-content">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Tự động xóa sau duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }
    }, duration);
}

// Lấy các phần tử DOM
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const shortenLinkBtn = document.getElementById('shortenLinkBtn');
const pasteBtn = document.getElementById('pasteBtn');

// Xử lý sự kiện dán từ clipboard
pasteBtn.addEventListener('click', async () => {
    try {
        // Thử dùng Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
            inputText.focus();
            showToast('Đã dán văn bản!', 'success');
        } else {
            // Fallback: focus vào textarea và hướng dẫn user paste thủ công
            inputText.focus();
            showToast('Vui lòng dùng Ctrl+V (hoặc Cmd+V) để dán!', 'info', 3000);
        }
    } catch (err) {
        // Nếu không có quyền truy cập clipboard, focus vào textarea
        inputText.focus();
        showToast('Vui lòng dùng Ctrl+V (hoặc Cmd+V) để dán!', 'info', 3000);
    }
});

// Xử lý sự kiện khi nhấn nút Đổi Icon
convertBtn.addEventListener('click', () => {
    const input = inputText.value.trim();
    
    if (input) {
        const result = replaceAllEmojis(input);
        outputText.value = result;
    } else {
        outputText.value = '';
        showToast('Vui lòng nhập văn bản!', 'warning');
    }
});

// Xử lý sự kiện khi nhấn Enter trong textarea (Ctrl+Enter hoặc Shift+Enter)
inputText.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        convertBtn.click();
    }
});

// Hàm sao chép với fallback
function copyToClipboard(text) {
    // Thử dùng Clipboard API (yêu cầu HTTPS hoặc localhost)
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => {
            return true;
        }).catch(() => {
            // Fallback nếu Clipboard API thất bại
            return fallbackCopyTextToClipboard(text);
        });
    } else {
        // Dùng phương pháp cũ nếu Clipboard API không khả dụng
        return fallbackCopyTextToClipboard(text);
    }
}

// Phương pháp sao chép dự phòng (hoạt động trên cả HTTP và HTTPS)
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful ? Promise.resolve() : Promise.reject();
    } catch (err) {
        document.body.removeChild(textArea);
        return Promise.reject(err);
    }
}

// Xử lý sự kiện sao chép
copyBtn.addEventListener('click', () => {
    const output = outputText.value;
    
    if (output) {
        copyToClipboard(output).then(() => {
            // Thông báo thành công
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Đã sao chép!';
            copyBtn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            }, 2000);
        }).catch(err => {
            showToast('Không thể sao chép. Vui lòng thử chọn và copy thủ công!', 'error');
        });
    } else {
        showToast('Không có nội dung để sao chép!', 'warning');
    }
});

// Xử lý sự kiện mở trang rút gọn link
shortenLinkBtn.addEventListener('click', () => {
    const output = outputText.value;
    
    if (output) {
        // Copy kết quả vào clipboard trước
        copyToClipboard(output).then(() => {
            // Mở trang rút gọn link
            window.open('https://mikichan.mobi/sualink.php?key=mikicute', '_blank');
            
            // Thông báo cho user
            const originalText = shortenLinkBtn.textContent;
            shortenLinkBtn.textContent = '✅ Đã copy! Dán vào ô "Đoạn văn"';
            shortenLinkBtn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            
            setTimeout(() => {
                shortenLinkBtn.textContent = originalText;
                shortenLinkBtn.style.background = 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
            }, 3000);
        }).catch(err => {
            // Nếu copy thất bại, vẫn mở trang và thông báo
            window.open('https://mikichan.mobi/sualink.php?key=mikicute', '_blank');
            showToast('Đã mở trang rút gọn link. Vui lòng copy kết quả và dán vào ô "Đoạn văn"!', 'info', 4000);
        });
    } else {
        // Nếu chưa có kết quả, vẫn mở trang nhưng thông báo
        window.open('https://mikichan.mobi/sualink.php?key=mikicute', '_blank');
        showToast('Chưa có kết quả để copy. Vui lòng nhập văn bản và click "Đổi Icon" trước!', 'warning', 4000);
    }
});

// Tự động chuyển đổi khi người dùng nhập (tùy chọn)
// Bỏ comment dòng dưới nếu muốn tự động chuyển đổi khi gõ
// inputText.addEventListener('input', () => {
//     if (inputText.value.trim()) {
//         outputText.value = replaceAllEmojis(inputText.value);
//     }
// });
