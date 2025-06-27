
        // Firebase Configuration
        const firebaseConfig = {
          apiKey: "AIzaSyD4EvDKSSjxjDTr3hGy_oUGxK4Vej2V1mA",
          authDomain: "trustbarter-7f8b0.firebaseapp.com",
          projectId: "trustbarter-7f8b0",
          storageBucket: "trustbarter-7f8b0.appspot.com",
          messagingSenderId: "550123374269",
          appId: "1:550123374269:web:bc84078db0c3b23f7ad9d4",
          measurementId: "G-XSD1K5KZJ3"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const storage = firebase.storage();

        // Nigerian States and LGAs Data
        const statesAndLGAs = {
            "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
            "Abuja": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
            "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
            "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"]
        };

        // DOM Elements
        const form = document.getElementById('loan-form');
        const submitBtn = document.getElementById('loan-submit');
        const submitText = document.getElementById('submitText');
        const loadingText = document.getElementById('loadingText');

        // Dropdown functionality
        function initializeDropdowns() {
            // State dropdown
            const stateToggle = document.getElementById('stateToggle');
            const stateOptions = document.getElementById('stateOptions');
            const selectedState = document.getElementById('selectedState');
            const stateInput = document.getElementById('stateInput');

            // LGA dropdown
            const lgaToggle = document.getElementById('lgaToggle');
            const lgaOptions = document.getElementById('lgaOptions');
            const selectedLGA = document.getElementById('selectedLGA');
            const lgaInput = document.getElementById('lgaInput');

            // Reason dropdown
            const reasonToggle = document.getElementById('reasonToggle');
            const reasonOptions = document.getElementById('reasonOptions');
            const selectedReason = document.getElementById('selectedReason');
            const loanReasonInput = document.getElementById('loanReasonInput');

            // User type dropdown
            const dropdownToggle = document.getElementById('dropdownToggle');
            const dropdownOptions = document.getElementById('dropdownOptions');
            const dropdownSelected = document.getElementById('dropdownSelected');
            const userTypeInput = document.getElementById('userType');

            // Populate states
            Object.keys(statesAndLGAs).forEach(state => {
                const li = document.createElement('li');
                li.textContent = state;
                li.className = 'cursor-pointer px-4 py-2 hover:bg-yellow-100';
                li.addEventListener('click', () => {
                    selectedState.textContent = state;
                    stateInput.value = state;
                    stateOptions.classList.add('hidden');
                    
                    // Enable and populate LGA dropdown
                    lgaToggle.disabled = false;
                    lgaToggle.classList.remove('disabled:opacity-50');
                    populateLGAs(state);
                    
                    // Reset LGA selection
                    selectedLGA.textContent = 'Select an LGA';
                    lgaInput.value = '';
                });
                stateOptions.appendChild(li);
            });

            function populateLGAs(state) {
                lgaOptions.innerHTML = '';
                statesAndLGAs[state].forEach(lga => {
                    const li = document.createElement('li');
                    li.textContent = lga;
                    li.className = 'cursor-pointer px-4 py-2 hover:bg-yellow-100';
                    li.addEventListener('click', () => {
                        selectedLGA.textContent = lga;
                        lgaInput.value = lga;
                        lgaOptions.classList.add('hidden');
                    });
                    lgaOptions.appendChild(li);
                });
            }

            // Toggle dropdowns
            stateToggle.addEventListener('click', () => {
                stateOptions.classList.toggle('hidden');
                lgaOptions.classList.add('hidden');
                reasonOptions.classList.add('hidden');
                dropdownOptions.classList.add('hidden');
            });

            lgaToggle.addEventListener('click', () => {
                if (!lgaToggle.disabled) {
                    lgaOptions.classList.toggle('hidden');
                    stateOptions.classList.add('hidden');
                    reasonOptions.classList.add('hidden');
                    dropdownOptions.classList.add('hidden');
                }
            });

            reasonToggle.addEventListener('click', () => {
                reasonOptions.classList.toggle('hidden');
                stateOptions.classList.add('hidden');
                lgaOptions.classList.add('hidden');
                dropdownOptions.classList.add('hidden');
            });

            dropdownToggle.addEventListener('click', () => {
                dropdownOptions.classList.toggle('hidden');
                stateOptions.classList.add('hidden');
                lgaOptions.classList.add('hidden');
                reasonOptions.classList.add('hidden');
            });

            // Reason dropdown handler
            reasonOptions.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    const value = e.target.getAttribute('data-value');
                    selectedReason.textContent = e.target.textContent;
                    loanReasonInput.value = value;
                    reasonOptions.classList.add('hidden');
                }
            });

            // User type dropdown handler
            dropdownOptions.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    const value = e.target.getAttribute('data-value');
                    dropdownSelected.textContent = e.target.textContent;
                    userTypeInput.value = value;
                    dropdownOptions.classList.add('hidden');
                    
                    // Show/hide conditional fields
                    const businessFields = document.getElementById('businessFields');
                    const salaryFields = document.getElementById('salaryFields');
                    
                    if (value === 'business') {
                        businessFields.classList.remove('hidden');
                        salaryFields.classList.add('hidden');
                    } else if (value === 'salary') {
                        salaryFields.classList.remove('hidden');
                        businessFields.classList.add('hidden');
                    }
                }
            });

            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.relative')) {
                    stateOptions.classList.add('hidden');
                    lgaOptions.classList.add('hidden');
                    reasonOptions.classList.add('hidden');
                    dropdownOptions.classList.add('hidden');
                }
            });
        }

        // File upload function
        async function uploadFile(file, path) {
            const storageRef = storage.ref().child(path);
            const snapshot = await storageRef.put(file);
            return await snapshot.ref.getDownloadURL();
        }

        // Show message function
        function showMessage(message, type = 'success') {
            const messageContainer = document.getElementById('messageContainer');
            const messageDiv = document.createElement('div');
            messageDiv.className = `p-4 rounded-md mb-4 ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
            messageDiv.textContent = message;
            
            messageContainer.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }

        // Form submission handler
        async function handleFormSubmit(e) {
            e.preventDefault();
            
            // Disable submit button and show loading
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            loadingText.classList.remove('hidden');

            try {
                const formData = new FormData(form);
                const applicationData = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    state: formData.get('state'),
                    lga: formData.get('lga'),
                    loanAmount: parseFloat(formData.get('loanAmount')),
                    loanReason: formData.get('loanReason'),
                    userType: formData.get('userType'),
                    applicationDate: firebase.firestore.FieldValue.serverTimestamp(),
                    status: 'pending'
                };

                // Add conditional fields
                if (formData.get('userType') === 'business') {
                    applicationData.monthlyTurnover = formData.get('monthlyTurnover');
                } else if (formData.get('userType') === 'salary') {
                    applicationData.monthlyIncome = formData.get('monthlyIncome');
                }

                // Generate unique ID for this application
                const applicationId = Date.now().toString();

                // Upload files
                const fileUploads = [];
                
                // Check for files and upload them
                const files = ['cacDocument', 'businessBankStatement', 'workId', 'salaryBankStatement', 'userPhoto'];
                
                for (const fileName of files) {
                    const file = formData.get(fileName);
                    if (file && file.size > 0) {
                        const filePath = `loan-applications/${applicationId}/${fileName}_${Date.now()}`;
                        try {
                            const downloadURL = await uploadFile(file, filePath);
                            applicationData[fileName + 'URL'] = downloadURL;
                        } catch (error) {
                            console.error(`Error uploading ${fileName}:`, error);
                        }
                    }
                }

                // Save to Firestore
                await db.collection('loanApplications').doc(applicationId).set(applicationData);

                showMessage('Application submitted successfully! We will review your application and get back to you soon.', 'success');
                form.reset();
                
                // Reset dropdowns
                document.getElementById('selectedState').textContent = 'Select a state';
                document.getElementById('selectedLGA').textContent = 'Select an LGA';
                document.getElementById('selectedReason').textContent = 'Select a reason';
                document.getElementById('dropdownSelected').textContent = 'Select an option';
                
                // Hide conditional fields
                document.getElementById('businessFields').classList.add('hidden');
                document.getElementById('salaryFields').classList.add('hidden');
                
                // Reset hidden inputs
                document.getElementById('stateInput').value = '';
                document.getElementById('lgaInput').value = '';
                document.getElementById('loanReasonInput').value = '';
                document.getElementById('userType').value = '';

            } catch (error) {
                console.error('Error submitting application:', error);
                showMessage('Error submitting application. Please try again.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitText.classList.remove('hidden');
                loadingText.classList.add('hidden');
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initializeDropdowns();
            form.addEventListener('submit', handleFormSubmit);
        });
