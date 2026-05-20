import { Router } from 'express';
import {
  getGlobalTemplatesController,
  getTemplatesBySchoolController,
  getAvailableTemplatesController,
  getAssessmentTemplateByIdController,
  createAssessmentTemplateController,
  updateAssessmentTemplateController,
  deactivateAssessmentTemplateController,
  isAssessmentTemplateActiveController
} from '../controllers/assessmentTemplateController.mjs';

const assessmentTemplateRouter = Router();

assessmentTemplateRouter.get('/global', getGlobalTemplatesController);
assessmentTemplateRouter.get('/school/:schoolId', getTemplatesBySchoolController);
assessmentTemplateRouter.get('/school/:schoolId/available', getAvailableTemplatesController);
assessmentTemplateRouter.get('/:id/active', isAssessmentTemplateActiveController);
assessmentTemplateRouter.get('/:id', getAssessmentTemplateByIdController);
assessmentTemplateRouter.post('/create', createAssessmentTemplateController);
assessmentTemplateRouter.put('/update/:id', updateAssessmentTemplateController);
assessmentTemplateRouter.patch('/deactivate/:id', deactivateAssessmentTemplateController);

export default assessmentTemplateRouter;