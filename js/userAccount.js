window.onload = function () {

    var accountAvatar = document.getElementsByClassName("account__avatar")[0];
    var accountMenu = document.getElementsByClassName("account__menu")[0];
    var avatarAngle = document.getElementsByClassName("account__avatar-angle")[0];
    accountAvatar.addEventListener("click", function () {
        accountMenu.classList.toggle("account__menu--show");
        avatarAngle.classList.toggle("account__avatar-angle--show");
    });

    $('.account__menu-item--logout').on('click', function () {
        window.sessionStorage.removeItem('user');
        window.location = "../index.html";
    });

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    if (user) {

        const initials = user.name.split(" ").map((n, idx, arr) => idx === 0 || idx === (arr.length - 1) ? n[0] : '').join('');

        $('#user-avatar-initials').text(initials);
        $('#user-name, #user-avatar-label').text(user.name);
        $('#user-email').text(user.email);
        $('#user-created').text(new Date(user.created).toLocaleDateString());
    } else {
        window.location = "login.html";
    }

    function formatHex(val) {
        if (val === undefined) {
            return val;
        }

        if (!val.startsWith('0x')) {
            return '0x' + val;
        } else {
            return val;
        }
    }

    if (window.web3) {
        window.web3.currentProvider.enable().then(() => {
            new Promise((res, rej) => {

                const addr = formatHex(window.web3.eth.defaultAccount);
                const decimals = 8;
                const tokenAddress = '0x490dbf7884b8e13c2161448b83dd2d8909db48ed';
                const contractData = ('0x70a08231000000000000000000000000' + addr.substr(2));

                window.web3.eth.call({
                    to: formatHex(tokenAddress),
                    data: contractData
                }, (err, result) => {
                    if (result) {
                        try {
                            const tokens = window.web3.toBigNumber(result);
                            const balance = tokens.div(10 ** decimals).toFixed(2);
                            res(balance);
                        } catch (error) {
                            res(0);
                        }
                    } else {
                        console.log(err);
                        res(0);
                    }
                });
            }).then(balance => {
                $('#user-curate-balance').text(Number(balance).toLocaleString());
            });
        });
    }
}
