import _ from 'lodash';
import '../scss/styles.scss';
import CondorLogo from '../images/condor-logo.min.svg';
import TcaHoriLogo from '../images/tca-logo-hori.min.svg';
import TcaVertLogo from '../images/tca-logo-vert-neg.min.svg';
import countryIcons from '../images/flags.png';
import countryIconsX2 from '../images/flags@2x.png';

(function() {

        // Country dropdown script

        var elements = document.querySelectorAll('li.country');
        var countryCode = document.querySelector("input#CountryCode");
        var selectedFlag = document.querySelector(".selected-flag .iti-flag ");
        var selectedFlagDropdown =  document.querySelector(".selected-flag");

        var toggleClass = function(element, className) {
            if (element.classList) {
                element.classList.toggle(className);
            } else {
                var classes = element.className.split(" ");
                var i = classes.indexOf(className);
                if (i >= 0)
                    classes.splice(i, 1);
                else
                    classes.push(className);
                element.className = classes.join(" ");
            }
        };

        var selectCountry = function(event) {
            elements = document.querySelectorAll('li.country');
            var originalCountryCode = elements[0].dataset.countryCode;
            var countryLiClone = this.cloneNode(true);
            countryCode.value = countryLiClone.dataset.dialCode;
            toggleClass(countryLiClone, "highlight");
            elements[0].parentNode.replaceChild(countryLiClone, elements[0]);
            toggleClass(selectedFlag, originalCountryCode);
            toggleClass(selectedFlag, countryLiClone.dataset.countryCode);
            toggleClass(this.parentNode.parentNode, "open");
        };

        var init = function() {
            countryCode.value = elements[0].dataset.dialCode;
            elements.forEach(function(el, index) {
                el.addEventListener("click", selectCountry);
            });
            selectedFlagDropdown.addEventListener("click", function(){
                toggleClass(this.parentNode, "open");
            });
        };

        init();

    }
)();

