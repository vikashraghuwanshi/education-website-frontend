import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Spinner.css';

const Spinner = ({ opaque }) => {

  const isLoading=true

  return (
    <div className={`spinner-page ${isLoading ? 'loading' : ''}`}>
      {isLoading && (
        <div className={`spinner-overlay ${opaque ? 'opaque' : 'transparent'}`}>
          <FontAwesomeIcon icon={faSpinner} spin color='red' size='8x'/>
        </div>
      )}
    </div>
  );
};

export default Spinner;
