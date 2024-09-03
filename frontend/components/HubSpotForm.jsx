// components/HubSpotForm.js
import { useEffect } from 'react';

const HubSpotForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '47263991',
          formId: '3f63527c-aa5f-40e1-8124-ee56819f7e34',
          target: '#hubspotFormContainer', // Target where the form will be rendered
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div id="hubspotFormContainer">
      {/* HubSpot form will be embedded here */}
    </div>
  );
};

export default HubSpotForm;
