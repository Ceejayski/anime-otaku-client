/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { Form, Card } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CreateAnime, UpdateAnime } from '../../redux/actions/adminAnimes';
import './style.scss';
import userServices from '../../auth/users.service';

function AdminAnimeForm({ createAnime, updateAnime }) {
  const { id } = useParams();
  const updateMode = !id;
  const schema = yup
    .object({
      name: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      rating: yup.number().min(0.0, 'Min value 0.0').max(5.0, 'Max value 5.0.'),
    })
    .required();
  const {
    register, handleSubmit, reset, formState, control, setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const options = [
    { value: 'Scifi', label: 'Scifi' },
    { value: 'Action', label: 'Action' },
    { value: 'Slice of life', label: 'Slice of life' },
    { value: 'Dystopian', label: 'Dystopian' },
    { value: 'High School', label: 'High School' },
  ];

  const onSubmit = (data) => {
    const genreList = data.genre_list.map((val) => val.value).join();
    if (updateMode) {
      createAnime(data.name, data.description, data.rating, data.header_image[0], genreList);
    } else {
      updateAnime(data.name, data.description, data.rating, genreList, id);
    }
  };

  useEffect(() => {
    if (!updateMode) {
      userServices.showUserAnime(id).then((res) => {
        const {
          name, description, rating, genre_list,
        } = res.data.data.attributes;
        const genresList = [];
        genre_list.forEach((genre) => genresList.push({ label: genre, value: genre }));
        setValue('name', name);
        setValue('description', description);
        setValue('rating', rating);
        setValue('genre_list', genresList);
      });
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset} className="main-form">
      <Card>
        <h4 className="text-center mb-3">{updateMode ? 'Create New Anime' : 'Edit Anime'}</h4>
        <Form.Group className="mb-3">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="name"
            id="name"
            {...register('name')}
            className={`form-control ${formState.errors.name ? 'is-invalid' : ''}`}
          />
          <Form.Text className="text-muted">{formState.errors.name?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicdescription">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            {...register('description')}
            cols="50"
            className={`form-control ${formState.errors.description ? 'is-invalid' : ''}`}
            rows="20"
          />
          <Form.Text className="text-muted">{formState.errors.description?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicrating">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            {...register('rating')}
            className={`form-control ${formState.errors.rating ? 'is-invalid' : ''}`}
          />
          <Form.Text className="text-muted">{formState.errors.rating?.message}</Form.Text>
        </Form.Group>
        <Form.Group className={`mb-3 ${!updateMode ? 'd-none' : ''}`}>
          <Form.Label>Anime image</Form.Label>
          <Form.Control
            type="file"
            name="header_image"
            {...register('header_image')}
            id="header_image"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Genre list
            <Controller
              control={control}
              name="genre_list"
              render={({ field }) => (
                <CreatableSelect options={options} isMulti className="w-100" {...field} />
              )}
            />
          </Form.Label>
        </Form.Group>
        <div className="form-group mx-auto">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}
            {updateMode ? 'Create' : 'Update'}
          </button>
          <Link to={updateMode ? '.' : '..'} className="btn btn-link">
            Cancel
          </Link>
        </div>
      </Card>
    </Form>
  );
}

AdminAnimeForm.propTypes = {
  createAnime: PropTypes.func.isRequired,
  updateAnime: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createAnime: CreateAnime,
  updateAnime: UpdateAnime,
};

export default connect(null, mapDispatchToProps)(AdminAnimeForm);
