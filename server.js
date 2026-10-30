const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Nơi chứa file HTML giao diện

// Token / Cookie lấy từ SpaceStation (Cần cập nhật nếu hết hạn)
const SPACESTATION_TOKEN = 'Bearer YOUR_SPACESTATION_TOKEN_HERE';

app.post('/api/change-bank', async (req, res) => {
    const { bankName, accountNumber, accountName } = req.body;

    try {
        // Gửi request thay đổi trực tiếp sang SpaceStation
        const response = await axios({
            method: 'POST', // hoặc 'PUT' tùy SpaceStation quy định
            url: 'HTTPS://SPACESTATION.COM/API/USER/UPDATE-BANK', // URL bắt được từ F12
            headers: {
                'Authorization': SPACESTATION_TOKEN,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0...'
            },
            data: {
                bank_code: bankName,
                account_number: accountNumber,
                account_holder: accountName
            }
        });

        res.json({ success: true, message: 'Đã cập nhật thành công lên SpaceStation!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi cập nhật SpaceStation' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));