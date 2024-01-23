import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchCandidateComponent } from './components/bench-candidate/bench-candidate.component';
import { CreateBenchCandidateComponent } from './components/create-bench-candidate/create-bench-candidate.component';
import { UpdateBenchCandidateComponent } from './components/update-bench-candidate/update-bench-candidate.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
@NgModule({
  declarations: [
    BenchCandidateComponent,
    CreateBenchCandidateComponent,
    UpdateBenchCandidateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    FooterModule,
    HeaderModule,
  ],
})
export class BenchCandidateModule {}
