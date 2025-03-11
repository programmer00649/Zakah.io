// دالة إظهار الإشعارات
function showNotification(message, type = 'info', duration = 5000) {
    const notificationContainer = document.getElementById('notification-container');

    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // إنشاء محتوى الإشعار
    const notificationContent = document.createElement('div');
    notificationContent.className = 'notification-content';

    // إضافة أيقونة حسب نوع الإشعار
    const icon = document.createElement('span');
    icon.className = 'notification-icon';

    switch (type) {
        case 'success':
            icon.innerHTML = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon.innerHTML = '<i class="fas fa-info-circle"></i>';
    }

    // إضافة نص الإشعار
    const text = document.createElement('span');
    text.className = 'notification-text';
    text.textContent = message;

    // إضافة زر الإغلاق
    const closeBtn = document.createElement('span');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'fadeOutUp 0.5s forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    });

    // تجميع عناصر الإشعار
    notificationContent.appendChild(icon);
    notificationContent.appendChild(text);
    notification.appendChild(notificationContent);
    notification.appendChild(closeBtn);

    // إضافة الإشعار إلى الحاوية
    notificationContainer.appendChild(notification);

    // إخفاء الإشعار بعد مدة محددة
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOutUp 0.5s forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    // سنجعل المستخدم يدخل سعر الذهب والفضة بنفسه
    let goldPricePerGram = 0; // سيتم تحديثه عند إدخال المستخدم
    let silverPricePerGram = 0; // سيتم تحديثه عند إدخال المستخدم

    // نصاب الذهب: 85 جرام
    const GOLD_NISAB_WEIGHT = 85; // جرام
    // نصاب الفضة: 595 جرام
    const SILVER_NISAB_WEIGHT = 595; // جرام
    // نصاب الزروع: 612 كيلوجرام
    const CROPS_NISAB_WEIGHT = 612; // كيلوجرام

    // الانتقال بين أنواع الزكاة
    const zakatTypeButtons = document.querySelectorAll('.zakat-type-btn');
    const calculatorSections = document.querySelectorAll('.calculator-section');

    zakatTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');

            // تنشيط الزر الحالي
            zakatTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // إظهار القسم المناسب
            calculatorSections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(`${type}-section`).style.display = 'block';
        });
    });

    // التبديل بين الذهب والفضة
    const metalTabs = document.querySelectorAll('.metal-tab');
    metalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const metal = tab.getAttribute('data-metal');

            // تنشيط التبويب الحالي
            metalTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // إظهار القسم المناسب
            document.getElementById('gold-section').style.display = metal === 'gold' ? 'block' : 'none';
            document.getElementById('silver-section').style.display = metal === 'silver' ? 'block' : 'none';
        });
    });

    // التبديل بين أنواع الأنعام
    const livestockTabs = document.querySelectorAll('.livestock-tab');
    livestockTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const livestock = tab.getAttribute('data-livestock');

            // تنشيط التبويب الحالي
            livestockTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // إظهار القسم المناسب
            document.getElementById('camel-section').style.display = livestock === 'camel' ? 'block' : 'none';
            document.getElementById('cow-section').style.display = livestock === 'cow' ? 'block' : 'none';
            document.getElementById('sheep-section').style.display = livestock === 'sheep' ? 'block' : 'none';
        });
    });

    // التبديل بين المعادن والركاز
    const mineralsTabs = document.querySelectorAll('.minerals-tab');
    mineralsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const mineral = tab.getAttribute('data-mineral');

            // تنشيط التبويب الحالي
            mineralsTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // إظهار القسم المناسب
            document.getElementById('metals-section').style.display = mineral === 'metals' ? 'block' : 'none';
            document.getElementById('treasure-section').style.display = mineral === 'treasure' ? 'block' : 'none';
        });
    });

    // حساب زكاة النقود
    document.getElementById('calculate-money-zakat').addEventListener('click', calculateMoneyZakat);

    // حساب زكاة الذهب
    document.getElementById('calculate-gold-zakat').addEventListener('click', calculateGoldZakat);

    // حساب زكاة الفضة
    document.getElementById('calculate-silver-zakat').addEventListener('click', calculateSilverZakat);

    // حساب زكاة عروض التجارة
    document.getElementById('calculate-trade-zakat').addEventListener('click', calculateTradeZakat);

    // حساب زكاة الزروع والثمار
    document.getElementById('calculate-crops-zakat').addEventListener('click', calculateCropsZakat);

    // حساب زكاة الإبل
    document.getElementById('calculate-camel-zakat').addEventListener('click', calculateCamelZakat);

    // حساب زكاة البقر
    document.getElementById('calculate-cow-zakat').addEventListener('click', calculateCowZakat);

    // حساب زكاة الغنم
    document.getElementById('calculate-sheep-zakat').addEventListener('click', calculateSheepZakat);

    // حساب زكاة المعادن
    document.getElementById('calculate-metals-zakat').addEventListener('click', calculateMetalsZakat);

    // حساب زكاة الركاز
    document.getElementById('calculate-treasure-zakat').addEventListener('click', calculateTreasureZakat);

    // حساب زكاة الفطر
    document.getElementById('calculate-fitr-zakat').addEventListener('click', calculateFitrZakat);

    // تحديث قيم النصاب في الواجهة
    function updateNisabValues() {
        const goldNisabValue = GOLD_NISAB_WEIGHT * goldPricePerGram;

        document.getElementById('gold-nisab-value').textContent = `${goldNisabValue.toLocaleString()} ريال`;
        document.getElementById('trade-nisab-value').textContent = `${goldNisabValue.toLocaleString()} ريال`;
        document.getElementById('metals-nisab-value').textContent = `${goldNisabValue.toLocaleString()} ريال`;
    }

    // تحديث قيمة نصاب النقود (بناءً على الفضة)
    function updateMoneyNisabValue() {
        // التحقق من وجود العنصر قبل تحديثه
        const silverNisabElement = document.getElementById('silver-nisab-value');
        if (!silverNisabElement) return;

        if (silverPricePerGram > 0) {
            const silverNisabValue = SILVER_NISAB_WEIGHT * silverPricePerGram;
            silverNisabElement.textContent = `${silverNisabValue.toLocaleString()} ريال`;
        } else {
            silverNisabElement.textContent = 'يجب إدخال سعر الفضة';
        }
    }

    // حساب زكاة النقود (معتمدًا على سعر الفضة)
    function calculateMoneyZakat() {
        const moneyAmount = parseFloat(document.getElementById('money-amount').value) || 0;
        // طلب سعر الفضة من المستخدم إذا لم يكن قد أدخله بعد
        if (silverPricePerGram <= 0) {
            // عرض رسالة تنبيه جميلة بدلاً من prompt التقليدي
            showSilverPriceModal("لحساب الزكاة", function(price) {
                if (price > 0) {
                    silverPricePerGram = price;
                    document.getElementById('global-silver-price').value = price;
                    updateMoneyNisabValue(); // تحديث قيمة نصاب النقود بعد تحديد سعر الفضة
                    calculateMoneyZakat(); // إعادة حساب الزكاة بعد تحديد السعر
                }
            });
            return;
        }

        const silverNisabValue = SILVER_NISAB_WEIGHT * silverPricePerGram;
        const zakatAmount = moneyAmount * 0.025; // 2.5%
        const nisabReached = moneyAmount >= silverNisabValue;

        document.getElementById('money-zakat-amount').textContent = nisabReached ? `${zakatAmount.toLocaleString()} ريال` : '0 ريال';
        document.getElementById('money-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة الذهب
    function calculateGoldZakat() {
        const goldWeight = parseFloat(document.getElementById('gold-weight').value) || 0;
        const goldPrice = parseFloat(document.getElementById('gold-price').value) || goldPricePerGram;

        const zakatWeight = goldWeight * 0.025; // 2.5% من الوزن
        const zakatValue = zakatWeight * goldPrice;
        const nisabReached = goldWeight >= GOLD_NISAB_WEIGHT;

        document.getElementById('gold-zakat-weight').textContent = nisabReached ? `${zakatWeight.toFixed(2)} جرام` : '0 جرام';
        document.getElementById('gold-zakat-value').textContent = nisabReached ? `${zakatValue.toLocaleString()} ريال` : '0 ريال';
        document.getElementById('gold-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة الفضة
    function calculateSilverZakat() {
        const silverWeight = parseFloat(document.getElementById('silver-weight').value) || 0;
        const silverPrice = parseFloat(document.getElementById('silver-price').value) || silverPricePerGram;

        // طلب سعر الفضة من المستخدم إذا لم يكن قد أدخله بعد ولم يتم تحديده عالميًا
        if (silverPrice <= 0 && silverPricePerGram <= 0) {
            // عرض رسالة تنبيه جميلة بدلاً من prompt التقليدي
            showSilverPriceModal("لحساب زكاة الفضة", function(price) {
                if (price > 0) {
                    silverPricePerGram = price;
                    document.getElementById('global-silver-price').value = price;
                    calculateSilverZakat(); // إعادة حساب الزكاة بعد تحديد السعر
                }
            });
            return;
        }

        const usedSilverPrice = silverPrice > 0 ? silverPrice : silverPricePerGram;
        const zakatWeight = silverWeight * 0.025; // 2.5% من الوزن
        const zakatValue = zakatWeight * usedSilverPrice;
        const nisabReached = silverWeight >= SILVER_NISAB_WEIGHT;

        document.getElementById('silver-zakat-weight').textContent = nisabReached ? `${zakatWeight.toFixed(2)} جرام` : '0 جرام';
        document.getElementById('silver-zakat-value').textContent = nisabReached ? `${zakatValue.toLocaleString()} ريال` : '0 ريال';
        document.getElementById('silver-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة عروض التجارة
    function calculateTradeZakat() {
        const tradeValue = parseFloat(document.getElementById('trade-value').value) || 0;

        // طلب سعر الذهب من المستخدم إذا لم يكن قد أدخله بعد
        if (goldPricePerGram <= 0) {
            // عرض رسالة تنبيه جميلة بدلاً من prompt التقليدي
            showGoldPriceModal("لحساب زكاة عروض التجارة", function(price) {
                if (price > 0) {
                    goldPricePerGram = price;
                    document.getElementById('global-gold-price').value = price;
                    updateNisabValues(); // تحديث قيم النصاب بعد تحديد سعر الذهب
                    calculateTradeZakat(); // إعادة حساب الزكاة بعد تحديد السعر
                }
            });
            return;
        }

        const goldNisabValue = GOLD_NISAB_WEIGHT * goldPricePerGram;
        const zakatAmount = tradeValue * 0.025; // 2.5%
        const nisabReached = tradeValue >= goldNisabValue;

        document.getElementById('trade-zakat-amount').textContent = nisabReached ? `${zakatAmount.toLocaleString()} ريال` : '0 ريال';
        document.getElementById('trade-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة الزروع والثمار
    function calculateCropsZakat() {
        const cropsWeight = parseFloat(document.getElementById('crops-weight').value) || 0;
        const cropsPrice = parseFloat(document.getElementById('crops-price').value) || 0;
        const irrigationType = document.querySelector('input[name="irrigation-type"]:checked').value;

        // تحديد نسبة الزكاة حسب نوع الري
        const zakatRate = irrigationType === 'natural' ? 0.1 : 0.05; // 10% للري الطبيعي، 5% للري الصناعي
        const zakatWeight = cropsWeight * zakatRate;
        const zakatValue = zakatWeight * cropsPrice;
        const nisabReached = cropsWeight >= CROPS_NISAB_WEIGHT;

        document.getElementById('crops-zakat-weight').textContent = nisabReached ? `${zakatWeight.toFixed(2)} كجم` : '0 كجم';
        document.getElementById('crops-zakat-value').textContent = nisabReached ? `${zakatValue.toLocaleString()} ريال` : '0 ريال';
        document.getElementById('crops-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة الإبل
    function calculateCamelZakat() {
        const camelCount = parseInt(document.getElementById('camel-count').value) || 0;
        let zakatAmount = 'لا زكاة';
        const nisabReached = camelCount >= 5;

        if (nisabReached) {
            // تحديد زكاة الإبل حسب العدد
            if (camelCount < 10) {
                zakatAmount = 'شاة واحدة';
            } else if (camelCount < 15) {
                zakatAmount = 'شاتان';
            } else if (camelCount < 20) {
                zakatAmount = 'ثلاث شياه';
            } else if (camelCount < 25) {
                zakatAmount = 'أربع شياه';
            } else if (camelCount < 36) {
                zakatAmount = 'بنت مخاض (أنثى إبل عمرها سنة)';
            } else if (camelCount < 46) {
                zakatAmount = 'بنت لبون (أنثى إبل عمرها سنتان)';
            } else if (camelCount < 61) {
                zakatAmount = 'حقة (أنثى إبل عمرها ثلاث سنوات)';
            } else if (camelCount < 76) {
                zakatAmount = 'جذعة (أنثى إبل عمرها أربع سنوات)';
            } else if (camelCount < 91) {
                zakatAmount = 'بنتا لبون (أنثتان من الإبل عمر كل منهما سنتان)';
            } else if (camelCount < 121) {
                zakatAmount = 'حقتان (أنثتان من الإبل عمر كل منهما ثلاث سنوات)';
            } else {
                // فوق 121
                const baseAmount = Math.floor(camelCount / 40);
                const remainder = camelCount % 40;
                zakatAmount = `${baseAmount} بنت لبون (عمرها سنتان)`;
                if (remainder >= 30) {
                    zakatAmount += ` و حقة واحدة (عمرها ثلاث سنوات)`;
                }
            }
        }

        document.getElementById('camel-zakat-amount').textContent = zakatAmount;
        document.getElementById('camel-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة البقر
    function calculateCowZakat() {
        const cowCount = parseInt(document.getElementById('cow-count').value) || 0;
        let zakatAmount = 'لا زكاة';
        const nisabReached = cowCount >= 30;

        if (nisabReached) {
            if (cowCount < 40) {
                zakatAmount = 'تبيع (عجل عمره سنة)';
            } else if (cowCount < 60) {
                zakatAmount = 'مسنة (بقرة عمرها سنتان)';
            } else {
                const tabee = Math.floor(cowCount / 30); // عدد التبيع
                const musinna = Math.floor(cowCount / 40); // عدد المسنة

                // اختيار الطريقة التي تعطي أقل زكاة
                if (tabee * 30 + musinna * 40 >= cowCount) {
                    zakatAmount = `${tabee} تبيع و ${musinna} مسنة`;
                } else {
                    // حساب بطريقة أخرى إذا لزم الأمر
                    const remainder = cowCount % 30;
                    if (remainder >= 10) {
                        tabee += 1;
                    }
                    zakatAmount = `${tabee} تبيع`;
                }
            }
        }

        document.getElementById('cow-zakat-amount').textContent = zakatAmount;
        document.getElementById('cow-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة الغنم
    function calculateSheepZakat() {
        const sheepCount = parseInt(document.getElementById('sheep-count').value) || 0;
        let zakatAmount = 'لا زكاة';
        const nisabReached = sheepCount >= 40;

        if (nisabReached) {
            if (sheepCount < 121) {
                zakatAmount = 'شاة واحدة';
            } else if (sheepCount < 201) {
                zakatAmount = 'شاتان';
            } else if (sheepCount < 400) {
                zakatAmount = 'ثلاث شياه';
            } else {
                const baseAmount = Math.floor(sheepCount / 100);
                zakatAmount = `${baseAmount} شياه`;
            }
        }

        document.getElementById('sheep-zakat-amount').textContent = zakatAmount;
        document.getElementById('sheep-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة المعادن
    function calculateMetalsZakat() {
        const metalsValue = parseFloat(document.getElementById('metals-value').value) || 0;

        // طلب سعر الذهب من المستخدم إذا لم يكن قد أدخله بعد
        if (goldPricePerGram <= 0) {
            // عرض رسالة تنبيه جميلة بدلاً من prompt التقليدي
            showGoldPriceModal("لحساب زكاة المعادن", function(price) {
                if (price > 0) {
                    goldPricePerGram = price;
                    document.getElementById('global-gold-price').value = price;
                    updateNisabValues(); // تحديث قيم النصاب بعد تحديد سعر الذهب
                    calculateMetalsZakat(); // إعادة حساب الزكاة بعد تحديد السعر
                }
            });
            return;
        }

        const goldNisabValue = GOLD_NISAB_WEIGHT * goldPricePerGram;
        const zakatAmount = metalsValue * 0.025; // 2.5%
        const nisabReached = metalsValue >= goldNisabValue;

        document.getElementById('metals-zakat-amount').textContent = nisabReached ? `${zakatAmount.toLocaleString()} ريال` : '0 ريال';
        document.getElementById('metals-nisab-reached').textContent = nisabReached ? 'نعم' : 'لا';
    }

    // حساب زكاة الركاز (الكنوز)
    function calculateTreasureZakat() {
        const treasureValue = parseFloat(document.getElementById('treasure-value').value) || 0;

        const zakatAmount = treasureValue * 0.2; // 20% (الخمس)

        document.getElementById('treasure-zakat-amount').textContent = `${zakatAmount.toLocaleString()} ريال`;
    }

    // حساب زكاة الفطر
    function calculateFitrZakat() {
        const familyCount = parseInt(document.getElementById('family-count').value) || 1;
        const foodPrice = parseFloat(document.getElementById('food-price').value) || 0;

        // صاع لكل فرد (حوالي 2.5 كجم)
        const saaPerPerson = 2.5; // كجم
        const totalSaa = familyCount * saaPerPerson;
        const zakatAmount = familyCount * foodPrice;

        document.getElementById('fitr-zakat-amount').textContent = `${zakatAmount.toLocaleString()} ريال`;
        document.getElementById('fitr-zakat-weight').textContent = `${totalSaa.toFixed(1)} كجم`;
    }

    // تحديث قيم النصاب في الواجهة بشكل منفصل
    function updateNisabValues() {
        if (goldPricePerGram > 0) {
            const goldNisabValue = GOLD_NISAB_WEIGHT * goldPricePerGram;

            // التحقق من وجود العناصر قبل تحديثها
            const goldNisabElement = document.getElementById('gold-nisab-value');
            const tradeNisabElement = document.getElementById('trade-nisab-value');
            const metalsNisabElement = document.getElementById('metals-nisab-value');

            if (goldNisabElement) {
                goldNisabElement.textContent = `${goldNisabValue.toLocaleString()} ريال`;
            }

            if (tradeNisabElement) {
                tradeNisabElement.textContent = `${goldNisabValue.toLocaleString()} ريال`;
            }

            if (metalsNisabElement) {
                metalsNisabElement.textContent = `${goldNisabValue.toLocaleString()} ريال`;
            }
        } else {
            // التحقق من وجود العناصر قبل تحديثها
            const goldNisabElement = document.getElementById('gold-nisab-value');
            const tradeNisabElement = document.getElementById('trade-nisab-value');
            const metalsNisabElement = document.getElementById('metals-nisab-value');

            if (goldNisabElement) {
                goldNisabElement.textContent = 'يجب إدخال سعر الذهب';
            }

            if (tradeNisabElement) {
                tradeNisabElement.textContent = 'يجب إدخال سعر الذهب';
            }

            if (metalsNisabElement) {
                metalsNisabElement.textContent = 'يجب إدخال سعر الذهب';
            }
        }
    }
        // نافذة منبثقة لإدخال سعر الذهب
    function showGoldPriceModal(purposeText, callback) {
        // إنشاء عناصر النافذة المنبثقة
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        const modalContainer = document.createElement('div');
        modalContainer.className = 'price-modal';

        // محتوى النافذة المنبثقة
        modalContainer.innerHTML = `
            <div class="modal-header">
                <div class="modal-icon">
                    <i class="fas fa-coins"></i>
                </div>
                <h3>نحتاج إلى معرفة سعر الذهب</h3>
            </div>
            <div class="modal-body">
                <p>تذكير: <span class="highlight">${purposeText}</span>، نحتاج إلى معرفة سعر جرام الذهب بالريال</p>
                <div class="quran-reminder">
                    ﴿ وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ ﴾
                    <span class="sura-info">سورة التوبة: آية ٣٤</span>
                </div>
                <div class="input-gold-container">
                    <label for="modal-gold-price">سعر جرام الذهب (بالريال):</label>
                    <input type="number" id="modal-gold-price" placeholder="أدخل السعر هنا" min="1" step="0.01">
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-confirm-btn pulse-animation">تأكيد وحساب الزكاة</button>
                <button class="modal-cancel-btn">إلغاء</button>
            </div>
        `;

        // إضافة النافذة للصفحة
        modalOverlay.appendChild(modalContainer);
        document.body.appendChild(modalOverlay);

        // تحريك المؤشر إلى حقل الإدخال
        const inputField = document.getElementById('modal-gold-price');
        inputField.focus();

        // إضافة تأثير ظهور
        setTimeout(() => {
            modalOverlay.classList.add('show');
            modalContainer.classList.add('show');
        }, 10);

        // معالجة الأحداث
        const confirmBtn = modalContainer.querySelector('.modal-confirm-btn');
        const cancelBtn = modalContainer.querySelector('.modal-cancel-btn');

        // زر التأكيد
        confirmBtn.addEventListener('click', () => {
            const price = parseFloat(inputField.value);
            if (!isNaN(price) && price > 0) {
                closeModal();
                showNotification(`تم تحديث سعر الذهب إلى ${price} ريال للجرام`, 'success', 4000);
                if (callback) callback(price);
            } else {
                inputField.classList.add('input-error');
                showNotification('الرجاء إدخال سعر صحيح للذهب', 'error', 3000);
                setTimeout(() => {
                    inputField.classList.remove('input-error');
                }, 1000);
            }
        });

        // زر الإلغاء
        cancelBtn.addEventListener('click', closeModal);

        // الضغط على مفتاح Enter
        inputField.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                confirmBtn.click();
            }
        });

        // النقر خارج النافذة
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // إغلاق النافذة
        function closeModal() {
            modalOverlay.classList.remove('show');
            modalContainer.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 300);
        }
    }

    // نافذة منبثقة لإدخال سعر الفضة - محسنة
    function showSilverPriceModal(purposeText, callback) {
        // إنشاء عناصر النافذة المنبثقة
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        const modalContainer = document.createElement('div');
        modalContainer.className = 'price-modal silver-modal animated-silver-modal';

        // محتوى النافذة المنبثقة المحسنة
        modalContainer.innerHTML = `
            <div class="modal-header silver-header">
                <div class="modal-icon">
                    <i class="fas fa-gem fa-spin-pulse"></i>
                </div>
                <h3 class="animated-title">نحتاج إلى معرفة سعر الفضة</h3>
                <div class="silver-decoration"></div>
            </div>
            <div class="modal-body silver-body">
                <p class="silver-reminder-text">تذكير: <span class="highlight">${purposeText}</span></p>
                <p class="silver-instruction">يرجى إدخال سعر جرام الفضة بالريال السعودي</p>
                
                <div class="quran-reminder silver-quran">
                    ﴿ وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ ﴾
                    <span class="sura-info">سورة التوبة: آية ٣٤</span>
                </div>
                
                <div class="input-silver-container animated-input">
                    <i class="fas fa-money-bill-wave input-icon silver-icon"></i>
                    <input type="number" id="modal-silver-price" placeholder="أدخل سعر الفضة هنا..." min="1" step="0.01" class="enhanced-input">
                    <div class="input-border"></div>
                </div>
                
                <div class="silver-benefits">
                    <div class="benefit-item">
                        <i class="fas fa-calculator"></i>
                        <span>دقة في حساب الزكاة</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-hand-holding-usd"></i>
                        <span>تحديد النصاب بدقة</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer silver-footer">
                <button class="modal-confirm-btn silver-confirm">
                    <i class="fas fa-check-circle"></i> تأكيد وحساب الزكاة
                </button>
                <button class="modal-cancel-btn silver-cancel">
                    <i class="fas fa-times-circle"></i> إلغاء
                </button>
            </div>
        `;

        // إضافة النافذة للصفحة
        modalOverlay.appendChild(modalContainer);
        document.body.appendChild(modalOverlay);

        // تحريك المؤشر إلى حقل الإدخال
        const inputField = document.getElementById('modal-silver-price');
        inputField.focus();

        // إضافة تأثير ظهور مع حركة
        setTimeout(() => {
            modalOverlay.classList.add('show');
            modalContainer.classList.add('show');
            
            // تحريك العناصر تباعاً
            const elements = modalContainer.querySelectorAll('.modal-header, .silver-reminder-text, .silver-instruction, .quran-reminder, .input-silver-container, .silver-benefits, .modal-footer');
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('element-show');
                }, 100 * (index + 1));
            });
        }, 10);

        // معالجة الأحداث
        const confirmBtn = modalContainer.querySelector('.modal-confirm-btn');
        const cancelBtn = modalContainer.querySelector('.modal-cancel-btn');

        // زر التأكيد مع تأثيرات
        confirmBtn.addEventListener('mouseenter', () => {
            confirmBtn.classList.add('btn-hover');
        });
        
        confirmBtn.addEventListener('mouseleave', () => {
            confirmBtn.classList.remove('btn-hover');
        });
        
        confirmBtn.addEventListener('click', () => {
            const price = parseFloat(inputField.value);
            if (!isNaN(price) && price > 0) {
                // تأثير نجاح
                confirmBtn.innerHTML = '<i class="fas fa-check-circle fa-bounce"></i> تم بنجاح';
                confirmBtn.classList.add('success-btn');
                
                // تأخير إغلاق النافذة للسماح برؤية تأثير النجاح
                setTimeout(() => {
                    closeModalWithEffect(() => {
                        showNotification(`تم تحديث سعر الفضة إلى ${price} ريال للجرام`, 'success', 4000);
                        if (callback) callback(price);
                    });
                }, 800);
            } else {
                inputField.classList.add('input-error');
                
                // تأثير متقدم للإشارة للخطأ
                confirmBtn.classList.add('error-shake');
                showNotification('الرجاء إدخال سعر صحيح للفضة', 'error', 3000);
                
                setTimeout(() => {
                    inputField.classList.remove('input-error');
                    confirmBtn.classList.remove('error-shake');
                }, 1000);
            }
        });

        // زر الإلغاء مع تأثيرات
        cancelBtn.addEventListener('mouseenter', () => {
            cancelBtn.classList.add('btn-hover');
        });
        
        cancelBtn.addEventListener('mouseleave', () => {
            cancelBtn.classList.remove('btn-hover');
        });
        
        cancelBtn.addEventListener('click', () => {
            closeModalWithEffect();
        });

        // الضغط على مفتاح Enter
        inputField.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                confirmBtn.click();
            }
        });

        // النقر خارج النافذة
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModalWithEffect();
            }
        });

        // إضافة حركة على مدخل السعر
        inputField.addEventListener('focus', () => {
            modalContainer.querySelector('.input-silver-container').classList.add('input-focus');
        });
        
        inputField.addEventListener('blur', () => {
            modalContainer.querySelector('.input-silver-container').classList.remove('input-focus');
        });

        // إغلاق النافذة مع تأثيرات
        function closeModalWithEffect(callback) {
            modalContainer.classList.add('modal-close');
            modalOverlay.classList.add('fade-out');
            
            setTimeout(() => {
                modalOverlay.remove();
                if (callback) callback();
            }, 500);
        }
    }

    // استدعاء وظائف تحديث النصاب عند تحميل الصفحة
    updateNisabValues();
    updateMoneyNisabValue();

    // إضافة مستمع حدث لزر تحديث سعر الذهب
    document.getElementById('update-gold-price').addEventListener('click', function() {
        const newGoldPrice = parseFloat(document.getElementById('global-gold-price').value);
        if (!isNaN(newGoldPrice) && newGoldPrice > 0) {
            goldPricePerGram = newGoldPrice;
            updateNisabValues();
            showNotification(`تم تحديث سعر الذهب إلى ${newGoldPrice} ريال للجرام`, 'success', 4000);
        } else {
            showNotification("يرجى إدخال سعر صحيح لجرام الذهب", 'error', 3000);
        }
    });

    // إضافة مستمع حدث لزر تحديث سعر الفضة
    document.getElementById('update-silver-price').addEventListener('click', function() {
        const newSilverPrice = parseFloat(document.getElementById('global-silver-price').value);
        if (!isNaN(newSilverPrice) && newSilverPrice > 0) {
            silverPricePerGram = newSilverPrice;
            updateMoneyNisabValue();
            showNotification(`تم تحديث سعر الفضة إلى ${newSilverPrice} ريال للجرام`, 'success', 4000);
        } else {
            showNotification("يرجى إدخال سعر صحيح لجرام الفضة", 'error', 3000);
        }
    });

    // إضافة تفاعلية للأزرار
    document.querySelectorAll('.calculate-btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // إظهار رسالة ترحيبية عند تحميل الصفحة
    setTimeout(() => {
        showNotification('مرحبًا بكم في حاسبة الزكاة الإسلامية، نسأل الله العلي القدير أن يجعلها في ميزان حسناتكم', 'success', 2000);
    }, 1000);
});