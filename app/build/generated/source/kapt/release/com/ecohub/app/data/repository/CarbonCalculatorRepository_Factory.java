package com.ecohub.app.data.repository;

import com.google.firebase.firestore.FirebaseFirestore;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;
import javax.inject.Provider;

@ScopeMetadata("javax.inject.Singleton")
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava"
})
public final class CarbonCalculatorRepository_Factory implements Factory<CarbonCalculatorRepository> {
  private final Provider<FirebaseFirestore> firestoreProvider;

  public CarbonCalculatorRepository_Factory(Provider<FirebaseFirestore> firestoreProvider) {
    this.firestoreProvider = firestoreProvider;
  }

  @Override
  public CarbonCalculatorRepository get() {
    return newInstance(firestoreProvider.get());
  }

  public static CarbonCalculatorRepository_Factory create(
      Provider<FirebaseFirestore> firestoreProvider) {
    return new CarbonCalculatorRepository_Factory(firestoreProvider);
  }

  public static CarbonCalculatorRepository newInstance(FirebaseFirestore firestore) {
    return new CarbonCalculatorRepository(firestore);
  }
}
